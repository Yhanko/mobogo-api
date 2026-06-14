import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Role } from '@/prisma';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { RedisService } from '@/infra/redis/redis.service';
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { hashPassword, generateDisplayId } from '@/common/utils/crypto.util';
import {
  paginate,
  toPrismaPage,
  PaginationParams,
} from '@/common/utils/pagination.util';
import { JwtPayload } from '@/common/types/jwt-payload.type';
import { CreateUserDto } from '@/modules/iam/users/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/iam/users/dto/update-user.dto';
import { BlockUserDto } from '@/modules/iam/users/dto/block-user.dto';

// Campos seguros para devolver — nunca expõe hashes
const SAFE_USER_SELECT = {
  id: true,
  name: true,
  phone: true,
  displayId: true,
  role: true,
  isActive: true,
  isBlocked: true,
  blockReason: true,
  createdAt: true,
  updatedAt: true,
  wallet: { select: { balance: true, currency: true } },
} as const;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly notifications: NotificationsService,
  ) {}

  // ── Criar utilizador ──────────────────────────────────────────────────────

  async create(dto: CreateUserDto, creator: JwtPayload) {
    // Pelo menos um identificador obrigatório
    if (!dto.phone && !dto.displayId && dto.role !== Role.PASSENGER) {
      throw new BadRequestException('Telefone obrigatório para este role');
    }

    if (!dto.phone && !dto.displayId) {
      // Passageiro sem telefone — gera displayId automaticamente
      if (dto.role === Role.PASSENGER) {
        dto.displayId = generateDisplayId();
      } else {
        throw new BadRequestException('Forneça telefone ou Display ID');
      }
    }

    // Verifica unicidade do telefone
    if (dto.phone) {
      const exists = await this.prisma.user.findUnique({
        where: { phone: dto.phone },
      });
      if (exists) throw new ConflictException('Telefone já registado');
    }

    // Admin não pode criar outro admin — apenas o seed o faz
    if (dto.role === Role.ADMIN && creator.role !== 'ADMIN') {
      throw new ForbiddenException('Não autorizado a criar administradores');
    }

    // Define se usa passwordHash ou pinHash
    const isPin = dto.role === Role.PASSENGER && !dto.phone;
    const hash = await hashPassword(dto.credential);

    const user = await this.prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          name: dto.name,
          phone: dto.phone,
          displayId: dto.displayId,
          role: dto.role,
          passwordHash: isPin ? null : hash,
          pinHash: isPin ? hash : null,
          isActive: true,
          createdById: creator.sub,
        },
        select: SAFE_USER_SELECT,
      });

      // Cria carteira automaticamente para todos os utilizadores
      await tx.wallet.create({
        data: { userId: created.id, balance: 0 },
      });

      return created;
    });

    this.logger.log(
      `Utilizador criado: ${user.id} | role: ${user.role} | por: ${creator.sub}`,
    );

    return user;
  }

  // ── Listar utilizadores — admin ───────────────────────────────────────────

  async findAll(
    params: PaginationParams,
    filters: { role?: Role; isActive?: boolean; isBlocked?: boolean },
  ) {
    const { skip, take, page, limit } = toPrismaPage(params);

    const where = {
      deletedAt: null,
      ...(filters.role !== undefined ? { role: filters.role } : {}),
      ...(filters.isActive !== undefined ? { isActive: filters.isActive } : {}),
      ...(filters.isBlocked !== undefined
        ? { isBlocked: filters.isBlocked }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: SAFE_USER_SELECT,
      }),
      this.prisma.user.count({ where }),
    ]);

    return paginate(items, total, { page, limit });
  }

  // ── Ver um utilizador ─────────────────────────────────────────────────────

  async findOne(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      select: {
        ...SAFE_USER_SELECT,
        agentProfile: {
          select: {
            id: true,
            dailyTicketLimit: true,
            permissions: true,
            isActive: true,
          },
        },
        driverProfile: {
          select: {
            id: true,
            licensePlate: true,
            status: true,
            workDays: true,
            currentBalance: true,
          },
        },
        createdBy: { select: { id: true, name: true, role: true } },
      },
    });

    if (!user) throw new NotFoundException('Utilizador não encontrado');
    return user;
  }

  // ── Actualizar utilizador ─────────────────────────────────────────────────

  async update(userId: string, dto: UpdateUserDto) {
    await this.findOne(userId); // garante que existe

    // Verifica unicidade do novo telefone se fornecido
    if (dto.phone) {
      const conflict = await this.prisma.user.findFirst({
        where: { phone: dto.phone, id: { not: userId } },
      });
      if (conflict)
        throw new ConflictException('Telefone já em uso por outro utilizador');
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: SAFE_USER_SELECT,
    });

    // Invalida cache de permissões no Redis
    await this.redis.del(RedisService.keys.userPerms(userId));

    return updated;
  }

  // ── Bloquear utilizador ───────────────────────────────────────────────────

  async block(userId: string, dto: BlockUserDto, blockedBy: JwtPayload) {
    const user = await this.findOne(userId);

    if (user.isBlocked) {
      throw new ConflictException('Utilizador já está bloqueado');
    }

    // Admin não pode ser bloqueado por outro admin
    if (user.role === Role.ADMIN) {
      throw new ForbiddenException('Não é possível bloquear um administrador');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { isBlocked: true, blockReason: dto.reason },
    });

    // Invalida cache — força re-validação no próximo request
    await this.redis.del(RedisService.keys.userPerms(userId));

    // Invalida refresh token — força logout imediato
    await this.redis.del(RedisService.keys.refreshToken(userId));

    await this.notifications.notifyAccountBlocked(userId);

    this.logger.log(
      `Utilizador bloqueado: ${userId} | motivo: ${dto.reason} | por: ${blockedBy.sub}`,
    );

    return { message: 'Utilizador bloqueado com sucesso' };
  }

  // ── Desbloquear utilizador ────────────────────────────────────────────────

  async unblock(userId: string, unblockedBy: JwtPayload) {
    const user = await this.findOne(userId);

    if (!user.isBlocked) {
      throw new ConflictException('Utilizador não está bloqueado');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { isBlocked: false, blockReason: null },
    });

    await this.redis.del(RedisService.keys.userPerms(userId));

    this.logger.log(
      `Utilizador desbloqueado: ${userId} | por: ${unblockedBy.sub}`,
    );

    return { message: 'Utilizador desbloqueado com sucesso' };
  }

  // ── Activar / desactivar ──────────────────────────────────────────────────

  async setActive(userId: string, isActive: boolean, by: JwtPayload) {
    await this.findOne(userId);

    await this.prisma.user.update({
      where: { id: userId },
      data: { isActive },
    });

    await this.redis.del(RedisService.keys.userPerms(userId));

    this.logger.log(
      `Utilizador ${isActive ? 'activado' : 'desactivado'}: ${userId} | por: ${by.sub}`,
    );

    return {
      message: `Utilizador ${isActive ? 'activado' : 'desactivado'} com sucesso`,
    };
  }

  // ── Soft delete ───────────────────────────────────────────────────────────

  async remove(userId: string, by: JwtPayload) {
    const user = await this.findOne(userId);

    if (user.role === Role.ADMIN) {
      throw new ForbiddenException('Não é possível eliminar um administrador');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date(), isActive: false },
    });

    await this.redis.del(RedisService.keys.userPerms(userId));
    await this.redis.del(RedisService.keys.refreshToken(userId));

    this.logger.log(`Utilizador eliminado (soft): ${userId} | por: ${by.sub}`);

    return { message: 'Utilizador eliminado com sucesso' };
  }

  // ── Pesquisa por telefone ou displayId ────────────────────────────────────

  async search(query: string) {
    const isPhone = /^\+\d{9,15}$/.test(query);
    const isDisplayId = /^TAX-[A-F0-9]{8}$/.test(query);

    if (!isPhone && !isDisplayId) {
      throw new BadRequestException(
        'Pesquisa deve ser por telefone (+244...) ou ID (TAX-XXXXXXXX)',
      );
    }

    const user = await this.prisma.user.findFirst({
      where: {
        ...(isPhone ? { phone: query } : {}),
        ...(isDisplayId ? { displayId: query } : {}),
        deletedAt: null,
      },
      select: SAFE_USER_SELECT,
    });

    if (!user) throw new NotFoundException('Utilizador não encontrado');
    return user;
  }
}
