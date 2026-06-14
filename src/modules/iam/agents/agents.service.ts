import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Role } from '@/prisma';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { RedisService } from '@/infra/redis/redis.service';
import { ROLE_PERMISSIONS, Permission } from '@/common/types/permission.enum';
import {
  paginate,
  toPrismaPage,
  PaginationParams,
} from '@/common/utils/pagination.util';
import { JwtPayload } from '@/common/types/jwt-payload.type';
import { CreateAgentDto } from '@/modules/iam/agents/dto/create-agents.dto';
import { UpdateAgentDto } from '@/modules/iam/agents/dto/update-agents.dto';
import { DelegatePermissionsDto } from '@/modules/iam/agents/dto/delegate-permission.dto';

// Permissões que um agente pode receber — subconjunto das permissões AGENT
const DELEGATABLE_PERMISSIONS = ROLE_PERMISSIONS[Role.AGENT];

const AGENT_SELECT = {
  id: true,
  isActive: true,
  dailyTicketLimit: true,
  permissions: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      phone: true,
      isBlocked: true,
      isActive: true,
    },
  },
  admin: {
    select: { id: true, name: true },
  },
} as const;

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  // ── Criar agente ──────────────────────────────────────────────────────────

  async create(dto: CreateAgentDto, admin: JwtPayload) {
    // Verifica que o utilizador existe e tem role AGENT
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId, deletedAt: null },
    });

    if (!user) throw new NotFoundException('Utilizador não encontrado');

    // O utilizador deve ter role AGENT — actualiza se necessário
    if (user.role !== Role.AGENT) {
      throw new BadRequestException(
        `Utilizador tem role "${user.role}". Deve ter role AGENT para ser criado como agente`,
      );
    }

    // Verifica se já tem perfil de agente
    const existing = await this.prisma.agent.findUnique({
      where: { userId: dto.userId },
    });
    if (existing)
      throw new ConflictException('Este utilizador já tem perfil de agente');

    // Valida que as permissões delegadas são subconjunto das permitidas
    if (dto.permissions?.length) {
      this.validateDelegatablePermissions(dto.permissions, admin);
    }

    const agent = await this.prisma.agent.create({
      data: {
        userId: dto.userId,
        adminId: admin.sub,
        dailyTicketLimit: dto.dailyTicketLimit ?? 100,
        permissions: dto.permissions ?? DELEGATABLE_PERMISSIONS,
      },
      select: AGENT_SELECT,
    });

    // Invalida cache de permissões para o novo agente
    await this.redis.del(RedisService.keys.userPerms(dto.userId));

    this.logger.log(
      `Agente criado: ${agent.id} | user: ${dto.userId} | admin: ${admin.sub}`,
    );

    return agent;
  }

  // ── Listar agentes — do próprio admin ─────────────────────────────────────

  async findAll(adminId: string, params: PaginationParams) {
    const { skip, take, page, limit } = toPrismaPage(params);

    const where = { adminId };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.agent.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: AGENT_SELECT,
      }),
      this.prisma.agent.count({ where }),
    ]);

    return paginate(items, total, { page, limit });
  }

  // ── Ver agente por ID ─────────────────────────────────────────────────────

  async findOne(agentId: string, admin: JwtPayload) {
    const agent = await this.prisma.agent.findUnique({
      where: { id: agentId },
      select: AGENT_SELECT,
    });

    if (!agent) throw new NotFoundException('Agente não encontrado');

    // Admin só vê os seus próprios agentes
    if (agent.admin.id !== admin.sub) {
      throw new ForbiddenException('Não autorizado a ver este agente');
    }

    return agent;
  }

  // ── Actualizar agente ─────────────────────────────────────────────────────

  async update(agentId: string, dto: UpdateAgentDto, admin: JwtPayload) {
    const agent = await this.findOne(agentId, admin);

    // Valida permissões se fornecidas
    if (dto.permissions?.length) {
      this.validateDelegatablePermissions(dto.permissions, admin);
    }

    const updated = await this.prisma.agent.update({
      where: { id: agentId },
      data: dto,
      select: AGENT_SELECT,
    });

    // Invalida cache — permissões ou limite mudaram
    await this.redis.del(RedisService.keys.userPerms(agent.user.id));

    return updated;
  }

  // ── Delegar permissões ────────────────────────────────────────────────────

  async delegatePermissions(
    agentId: string,
    dto: DelegatePermissionsDto,
    admin: JwtPayload,
  ) {
    const agent = await this.findOne(agentId, admin);

    // Valida que o admin não delega permissões que ele próprio não tem
    this.validateDelegatablePermissions(dto.permissions, admin);

    const updated = await this.prisma.agent.update({
      where: { id: agentId },
      data: { permissions: dto.permissions },
      select: AGENT_SELECT,
    });

    // Invalida cache imediatamente — efeito em 30 segundos (TTL do cache)
    await this.redis.del(RedisService.keys.userPerms(agent.user.id));

    this.logger.log(
      `Permissões delegadas: agente=${agentId} | ` +
        `perms=${dto.permissions.join(',')} | admin=${admin.sub}`,
    );

    return {
      message: 'Permissões actualizadas com sucesso',
      permissions: updated.permissions,
    };
  }

  // ── Activar / desactivar agente ───────────────────────────────────────────

  async setActive(agentId: string, isActive: boolean, admin: JwtPayload) {
    const agent = await this.findOne(agentId, admin);

    await this.prisma.agent.update({
      where: { id: agentId },
      data: { isActive },
    });

    // Invalida cache — agente inactivo perde permissões delegadas
    await this.redis.del(RedisService.keys.userPerms(agent.user.id));

    this.logger.log(
      `Agente ${isActive ? 'activado' : 'desactivado'}: ${agentId} | admin: ${admin.sub}`,
    );

    return {
      message: `Agente ${isActive ? 'activado' : 'desactivado'} com sucesso`,
    };
  }

  // ── Actividade do agente (tickets emitidos hoje) ──────────────────────────

  async getActivity(agentId: string, admin: JwtPayload) {
    const agent = await this.findOne(agentId, admin);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayCount, monthCount, byStatus] = await this.prisma.$transaction([
      // Tickets emitidos hoje
      this.prisma.ticket.count({
        where: {
          issuedById: agent.user.id,
          createdAt: { gte: today },
        },
      }),

      // Tickets emitidos este mês
      this.prisma.ticket.count({
        where: {
          issuedById: agent.user.id,
          createdAt: {
            gte: new Date(today.getFullYear(), today.getMonth(), 1),
          },
        },
      }),

      // Por status este mês
      this.prisma.$queryRaw<{ status: string; count: bigint }[]>`
        SELECT status, COUNT(*)::int AS count
        FROM tickets
        WHERE issued_by_id = ${agent.user.id}
          AND created_at  >= ${new Date(today.getFullYear(), today.getMonth(), 1)}
        GROUP BY status
      `,
    ]);

    return {
      agentId: agent.id,
      agentName: agent.user.name,
      dailyLimit: agent.dailyTicketLimit,
      todayIssued: todayCount,
      todayRemaining: Math.max(0, agent.dailyTicketLimit - todayCount),
      usagePercent: Math.round((todayCount / agent.dailyTicketLimit) * 100),
      monthIssued: monthCount,
      byStatus: byStatus.map((r) => ({
        status: r.status,
        count: Number(r.count),
      })),
    };
  }

  // ── Helper — valida permissões delegáveis ─────────────────────────────────

  private validateDelegatablePermissions(
    permissions: Permission[],
    admin: JwtPayload,
  ): void {
    // Admin tem todas as permissões — pode delegar qualquer subconjunto
    if (admin.role === Role.ADMIN) return;

    // Outros roles não podem delegar permissões que não têm
    const invalid = permissions.filter(
      (p) => !DELEGATABLE_PERMISSIONS.includes(p),
    );

    if (invalid.length > 0) {
      throw new ForbiddenException(
        `Não pode delegar estas permissões: ${invalid.join(', ')}`,
      );
    }
  }
}
