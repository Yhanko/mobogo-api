import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Role, DriverStatus } from '@prisma/client';
import { PrismaService }  from '../../../infrastructure/prisma/prisma.service';
import { RedisService }   from '../../../infrastructure/redis/redis.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { paginate, toPrismaPage, PaginationParams } from '../../../common/utils/pagination.util';
import { JwtPayload }      from '../../../common/types/jwt-payload.type';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

const DRIVER_SELECT = {
  id:             true,
  licensePlate:   true,
  status:         true,
  workDays:       true,
  currentBalance: true,
  createdAt:      true,
  updatedAt:      true,
  user: {
    select: {
      id:        true,
      name:      true,
      phone:     true,
      displayId: true,
      isActive:  true,
      isBlocked: true,
    },
  },
  client: {
    select: { id: true, name: true, phone: true },
  },
} as const;

@Injectable()
export class DriversService {
  private readonly logger = new Logger(DriversService.name);

  constructor(
    private readonly prisma:        PrismaService,
    private readonly redis:         RedisService,
    private readonly notifications: NotificationsService,
  ) {}

  // ── Criar taxista (cliente vincula um utilizador como seu taxista) ─────────

  async create(dto: CreateDriverDto, client: JwtPayload) {
    // Verifica que o utilizador existe com role DRIVER
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId, deletedAt: null },
    });

    if (!user) throw new NotFoundException('Utilizador não encontrado');

    if (user.role !== Role.DRIVER) {
      throw new BadRequestException(
        `Utilizador tem role "${user.role}". Deve ter role DRIVER`,
      );
    }

    // Verifica se já tem perfil de taxista
    const existing = await this.prisma.driver.findUnique({
      where: { userId: dto.userId },
    });
    if (existing) throw new ConflictException('Este utilizador já tem perfil de taxista');

    // Verifica unicidade da matrícula
    const plateExists = await this.prisma.driver.findUnique({
      where: { licensePlate: dto.licensePlate },
    });
    if (plateExists) {
      throw new ConflictException(`Matrícula "${dto.licensePlate}" já registada`);
    }

    const driver = await this.prisma.driver.create({
      data: {
        userId:       dto.userId,
        clientId:     client.sub,
        licensePlate: dto.licensePlate,
        workDays:     dto.workDays ?? [1, 2, 3, 4, 5],
        status:       DriverStatus.ACTIVE,
      },
      select: DRIVER_SELECT,
    });

    // Notifica o cliente que o taxista foi adicionado
    await this.notifications.notifyDriverAdded(
      client.sub,
      driver.user.name,
      driver.licensePlate,
    );

    this.logger.log(
      `Taxista criado: ${driver.id} | matrícula: ${dto.licensePlate} | cliente: ${client.sub}`,
    );

    return driver;
  }

  // ── Listar taxistas do cliente ────────────────────────────────────────────

  async findAll(
    clientId: string,
    params:   PaginationParams,
    filters:  { status?: DriverStatus } = {},
  ) {
    const { skip, take, page, limit } = toPrismaPage(params);

    const where = {
      clientId,
      ...(filters.status ? { status: filters.status } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.driver.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select:  DRIVER_SELECT,
      }),
      this.prisma.driver.count({ where }),
    ]);

    return paginate(items, total, { page, limit });
  }

  // ── Ver taxista por ID ────────────────────────────────────────────────────

  async findOne(driverId: string, requester: JwtPayload) {
    const driver = await this.prisma.driver.findUnique({
      where:  { id: driverId },
      select: {
        ...DRIVER_SELECT,
        lotadorPartnerships: {
          where:  { isActive: true },
          select: {
            referenceCode: true,
            lotador: { select: { id: true, name: true, phone: true } },
          },
        },
      },
    });

    if (!driver) throw new NotFoundException('Taxista não encontrado');

    // Taxista só vê o seu próprio perfil
    if (requester.role === 'DRIVER' && driver.user.id !== requester.sub) {
      throw new ForbiddenException('Não autorizado');
    }

    // Cliente só vê os seus próprios taxistas
    if (requester.role === 'CLIENT' && driver.client.id !== requester.sub) {
      throw new ForbiddenException('Este taxista não pertence à sua conta');
    }

    return driver;
  }

  // ── Actualizar taxista ────────────────────────────────────────────────────

  async update(driverId: string, dto: UpdateDriverDto, requester: JwtPayload) {
    const driver = await this.findOne(driverId, requester);

    // Taxista só pode actualizar os seus próprios dias de trabalho
    if (requester.role === 'DRIVER') {
      if (dto.licensePlate || dto.status) {
        throw new ForbiddenException(
          'Taxista só pode actualizar os seus dias de trabalho',
        );
      }
    }

    // Verifica unicidade da nova matrícula se fornecida
    if (dto.licensePlate && dto.licensePlate !== driver.licensePlate) {
      const conflict = await this.prisma.driver.findUnique({
        where: { licensePlate: dto.licensePlate },
      });
      if (conflict) throw new ConflictException('Matrícula já registada');
    }

    const updated = await this.prisma.driver.update({
      where:  { id: driverId },
      data:   dto,
      select: DRIVER_SELECT,
    });

    return updated;
  }

  // ── Activar / desactivar taxista ──────────────────────────────────────────

  async setStatus(
    driverId: string,
    status:   DriverStatus,
    requester: JwtPayload,
  ) {
    const driver = await this.findOne(driverId, requester);

    // Só cliente ou admin pode mudar status
    if (!['CLIENT', 'ADMIN'].includes(requester.role)) {
      throw new ForbiddenException('Sem permissão para alterar o estado do taxista');
    }

    // Cliente só altera os seus próprios taxistas
    if (requester.role === 'CLIENT' && driver.client.id !== requester.sub) {
      throw new ForbiddenException('Este taxista não pertence à sua conta');
    }

    await this.prisma.driver.update({
      where: { id: driverId },
      data:  { status },
    });

    // Se bloqueado — remove localização do Redis imediatamente
    if (status === DriverStatus.BLOCKED) {
      await Promise.all([
        this.redis.del(RedisService.keys.driverLocation(driverId)),
        this.redis.del(RedisService.keys.driverOnline(driverId)),
      ]);
    }

    this.logger.log(
      `Estado do taxista alterado: ${driverId} → ${status} | por: ${requester.sub}`,
    );

    return { message: `Taxista ${status.toLowerCase()} com sucesso` };
  }

  // ── Definir dias de trabalho ──────────────────────────────────────────────

  async setWorkDays(driverId: string, workDays: number[], requester: JwtPayload) {
    // Valida os dias (0-6)
    if (workDays.some((d) => d < 0 || d > 6)) {
      throw new BadRequestException('Dias inválidos. Use 0 (Dom) a 6 (Sáb)');
    }

    if (workDays.length === 0) {
      throw new BadRequestException('Defina pelo menos um dia de trabalho');
    }

    // Remove duplicados
    const unique = [...new Set(workDays)].sort();

    await this.findOne(driverId, requester);   // valida acesso

    const updated = await this.prisma.driver.update({
      where:  { id: driverId },
      data:   { workDays: unique },
      select: { id: true, workDays: true },
    });

    return updated;
  }

  // ── Saldo actual do taxista ───────────────────────────────────────────────

  async getBalance(driverId: string, requester: JwtPayload) {
    const driver = await this.findOne(driverId, requester);

    const wallet = await this.prisma.wallet.findUnique({
      where:  { userId: driver.user.id },
      select: { balance: true, currency: true, updatedAt: true },
    });

    if (!wallet) throw new NotFoundException('Carteira não encontrada');

    return {
      driverName:     driver.user.name,
      licensePlate:   driver.licensePlate,
      currentBalance: Number(driver.currentBalance),
      walletBalance:  Number(wallet.balance),
      currency:       wallet.currency,
      updatedAt:      wallet.updatedAt,
    };
  }

  // ── Histórico de recebimentos do taxista ──────────────────────────────────

  async getPaymentHistory(
    driverId:  string,
    params:    PaginationParams,
    requester: JwtPayload,
  ) {
    const driver = await this.findOne(driverId, requester);

    const wallet = await this.prisma.wallet.findUnique({
      where: { userId: driver.user.id },
    });
    if (!wallet) throw new NotFoundException('Carteira não encontrada');

    const { skip, take, page, limit } = toPrismaPage(params);

    const where = {
      walletId: wallet.id,
      type:     'PAYMENT' as const,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: {
          id:            true,
          amount:        true,
          balanceBefore: true,
          balanceAfter:  true,
          createdAt:     true,
          ticket: {
            select: {
              id:        true,
              passenger: { select: { name: true, phone: true, displayId: true } },
            },
          },
        },
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return paginate(items, total, { page, limit });
  }

  // ── Lotadores parceiros do taxista ────────────────────────────────────────

  async getLotadorPartners(driverId: string, requester: JwtPayload) {
    await this.findOne(driverId, requester);   // valida acesso

    const partners = await this.prisma.lotadorPartner.findMany({
      where:   { driverId, isActive: true },
      include: {
        lotador: {
          select: { id: true, name: true, phone: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return partners.map((p) => ({
      referenceCode: p.referenceCode,
      since:         p.createdAt,
      lotador:       p.lotador,
    }));
  }
}

  // ── Buscar perfil de taxista pelo userId (para GET /me) ───────────────────

  async findDriverByUserId(userId: string) {
    const driver = await this.prisma.driver.findUnique({
      where:  { userId },
      select: {
        ...DRIVER_SELECT,
        lotadorPartnerships: {
          where:  { isActive: true },
          select: {
            referenceCode: true,
            lotador: { select: { id: true, name: true, phone: true } },
          },
        },
      },
    });

    if (!driver) throw new NotFoundException('Perfil de taxista não encontrado');
    return driver;
  }

