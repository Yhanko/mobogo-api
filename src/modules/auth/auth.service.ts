import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { RedisService } from '@/infra/redis/redis.service';
import { ROLE_PERMISSIONS, Permission } from '@/common/types/permission.enum';
import { JwtPayload } from '@/common/types/jwt-payload.type';
import { verifyPassword, hashPassword } from '@/common/utils/crypto.util';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { ChangePasswordDto } from '@/modules/auth/dto/change-password.dto';
import { RegisterAdminDto } from '@/modules/auth/dto/register-admin.dto';
import { randomBytes } from 'crypto';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // segundos
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
    private readonly config: ConfigService,
  ) {}

  // ── Register Super Admin ──────────────────────────────────────────────────

  async registerAdmin(dto: RegisterAdminDto): Promise<void> {
    // Verificar se o email já existe no displayId
    const existingUser = await this.prisma.user.findFirst({
      where: { displayId: dto.email, deletedAt: null },
    });

    if (existingUser) {
      throw new BadRequestException('Email já se encontra em uso.');
    }

    const newHash = await hashPassword(dto.password);

    await this.prisma.user.create({
      data: {
        name: dto.name,
        displayId: dto.email,
        passwordHash: newHash,
        role: 'ADMIN',
        isActive: true,
      },
    });

    this.logger.log(`Super Admin registado: ${dto.email}`);
  }

  // ── Login ─────────────────────────────────────────────────────────────────

  async login(dto: LoginDto): Promise<AuthTokens> {
    // Valida que pelo menos um identificador foi fornecido
    if (!dto.phone && !dto.displayId) {
      throw new BadRequestException('Forneça telefone ou ID de utilizador');
    }

    // Busca utilizador pelo identificador fornecido
    const user = await this.prisma.user.findFirst({
      where: {
        ...(dto.phone ? { phone: dto.phone } : {}),
        ...(dto.displayId ? { displayId: dto.displayId } : {}),
        deletedAt: null,
      },
      include: {
        agentProfile: {
          select: { permissions: true, isActive: true, adminId: true },
        },
      },
    });

    if (!user) {
      // Mensagem genérica — não revela se o utilizador existe
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verifica bloqueio antes de verificar password (não gasta tempo em hash)
    if (user.isBlocked) {
      throw new ForbiddenException('Conta bloqueada. Contacte o administrador');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Conta inactiva');
    }

    // Verifica credencial — password ou PIN dependendo do tipo de utilizador
    const storedHash = user.passwordHash ?? user.pinHash;
    if (!storedHash) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isValid = await verifyPassword(dto.credential, storedHash);
    if (!isValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Constrói permissões — base do role + delegadas se agente
    const basePermissions = ROLE_PERMISSIONS[user.role] ?? [];
    const delegated =
      user.role === 'AGENT' && user.agentProfile?.isActive
        ? (user.agentProfile.permissions as Permission[])
        : [];

    const permissions = Array.from(new Set([...basePermissions, ...delegated]));

    const payload: JwtPayload = {
      sub: user.id,
      role: user.role,
      permissions,
      ...(user.role === 'AGENT' && user.agentProfile
        ? { adminId: user.agentProfile.adminId }
        : {}),
    };

    return this.issueTokens(payload);
  }

  // ── Refresh ───────────────────────────────────────────────────────────────

  async refresh(token: string): Promise<AuthTokens> {
    // Verifica se o refresh token está no Redis (rotation)
    const userId = await this.redis.get(
      `${RedisService.keys.refreshToken(token)}`,
    );

    if (!userId) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }

    // Invalida o token actual imediatamente (rotation)
    await this.redis.del(RedisService.keys.refreshToken(token));

    // Recarrega utilizador para garantir estado actual
    const user = await this.prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      include: {
        agentProfile: {
          select: { permissions: true, isActive: true, adminId: true },
        },
      },
    });

    if (!user || !user.isActive || user.isBlocked) {
      throw new UnauthorizedException('Utilizador inactivo ou bloqueado');
    }

    const basePermissions = ROLE_PERMISSIONS[user.role] ?? [];
    const delegated =
      user.role === 'AGENT' && user.agentProfile?.isActive
        ? (user.agentProfile.permissions as Permission[])
        : [];

    const payload: JwtPayload = {
      sub: user.id,
      role: user.role,
      permissions: Array.from(new Set([...basePermissions, ...delegated])),
      ...(user.role === 'AGENT' && user.agentProfile
        ? { adminId: user.agentProfile.adminId }
        : {}),
    };

    return this.issueTokens(payload);
  }

  // ── Logout ────────────────────────────────────────────────────────────────

  async logout(refreshToken: string): Promise<void> {
    await this.redis.del(RedisService.keys.refreshToken(refreshToken));
  }

  // ── Alterar password/PIN ──────────────────────────────────────────────────

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new UnauthorizedException('Utilizador não encontrado');

    const storedHash = user.passwordHash ?? user.pinHash;
    if (!storedHash) throw new UnauthorizedException('Credenciais inválidas');

    const isValid = await verifyPassword(dto.currentCredential, storedHash);
    if (!isValid) {
      throw new UnauthorizedException('Credencial actual incorrecta');
    }

    const newHash = await hashPassword(dto.newCredential);

    // Actualiza o campo correcto dependendo do tipo de utilizador
    await this.prisma.user.update({
      where: { id: userId },
      data: user.passwordHash
        ? { passwordHash: newHash }
        : { pinHash: newHash },
    });

    // Invalida todos os refresh tokens activos do utilizador
    // (força novo login em todos os dispositivos)
    this.logger.log(`Password alterada para utilizador ${userId}`);
  }

  // ── Valida token (usado pelo JwtStrategy) ─────────────────────────────────

  async validatePayload(payload: JwtPayload): Promise<JwtPayload> {
    // Tenta ler permissões do cache Redis primeiro
    const cacheKey = RedisService.keys.userPerms(payload.sub);
    const cached = await this.redis.getJson<JwtPayload>(cacheKey);

    if (cached) return cached;

    // Cache miss — vai à base de dados
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        isActive: true,
        isBlocked: true,
        role: true,
        agentProfile: { select: { permissions: true, isActive: true } },
      },
    });

    if (!user || !user.isActive || user.isBlocked) {
      throw new UnauthorizedException('Utilizador inactivo ou bloqueado');
    }

    const base = ROLE_PERMISSIONS[user.role] ?? [];
    const delegated =
      user.role === 'AGENT' && user.agentProfile?.isActive
        ? (user.agentProfile.permissions as Permission[])
        : [];

    const result: JwtPayload = {
      sub: payload.sub,
      role: user.role,
      permissions: Array.from(new Set([...base, ...delegated])),
      adminId: payload.adminId,
    };

    // Guarda no cache por 30 segundos
    const ttl = this.config.get<number>('REDIS_TTL_PERM_CACHE', 30);
    await this.redis.setJson(cacheKey, result, ttl);

    return result;
  }

  // ── Helper privado — emite access + refresh token ─────────────────────────

  private async issueTokens(payload: JwtPayload): Promise<AuthTokens> {
    const accessToken = this.jwt.sign(payload);

    // Refresh token — string aleatória opaca, não é JWT
    // O JWT pode ser decodificado por qualquer um; o refresh token não
    const refreshToken = randomBytes(40).toString('hex');

    const refreshTtl = this.parseTtlToSeconds(
      this.config.get<string>('JWT_REFRESH_EXPIRES', '7d'),
    );

    // Guarda no Redis: chave=token, valor=userId
    await this.redis.set(
      RedisService.keys.refreshToken(refreshToken),
      payload.sub,
      refreshTtl,
    );

    const accessTtl = this.parseTtlToSeconds(
      this.config.get<string>('JWT_ACCESS_EXPIRES', '15m'),
    );

    return { accessToken, refreshToken, expiresIn: accessTtl };
  }

  // Converte '15m', '7d', '1h' em segundos
  private parseTtlToSeconds(ttl: string): number {
    const unit = ttl.slice(-1);
    const value = parseInt(ttl.slice(0, -1), 10);
    const map: Record<string, number> = { s: 1, m: 60, h: 3600, d: 86400 };
    return value * (map[unit] ?? 1);
  }
}
