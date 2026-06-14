import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@/infra/prisma/prisma.service';
import {
  paginate,
  toPrismaPage,
  PaginationParams,
} from '@/common/utils/pagination.util';
import { JwtPayload } from '@/common/types/jwt-payload.type';
import { RidesFilterDto } from '@/modules/rides/dto/rides.dto';

// Selects reutilizáveis para evitar over-fetching
const RIDE_SELECT = {
  id: true,
  amount: true,
  status: true,
  shortCode: true,
  createdAt: true,
  usedAt: true,
  expiresAt: true,
  cancelReason: true,
  passenger: {
    select: {
      id: true,
      name: true,
      phone: true,
      displayId: true,
    },
  },
  driver: {
    select: {
      id: true,
      licensePlate: true,
      user: { select: { id: true, name: true } },
    },
  },
  issuedBy: {
    select: { id: true, name: true, role: true },
  },
} as const;

@Injectable()
export class RidesService {
  private readonly logger = new Logger(RidesService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ── Histórico geral — admin vê tudo com filtros ───────────────────────────

  async findAll(filters: RidesFilterDto, params: PaginationParams) {
    const { skip, take, page, limit } = toPrismaPage(params);

    const where = this.buildWhereClause(filters);

    const [items, total] = await this.prisma.$transaction([
      this.prisma.ticket.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: RIDE_SELECT,
      }),
      this.prisma.ticket.count({ where }),
    ]);

    return paginate(items, total, { page, limit });
  }

  // ── Histórico por passageiro ──────────────────────────────────────────────

  async findByPassenger(
    passengerId: string,
    filters: RidesFilterDto,
    params: PaginationParams,
    requester: JwtPayload,
  ) {
    // Passageiro só vê as suas próprias corridas
    if (requester.role === 'PASSENGER' && requester.sub !== passengerId) {
      throw new ForbiddenException(
        'Não autorizado a ver corridas de outro passageiro',
      );
    }

    const { skip, take, page, limit } = toPrismaPage(params);

    const where = { ...this.buildWhereClause(filters), passengerId };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.ticket.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: RIDE_SELECT,
      }),
      this.prisma.ticket.count({ where }),
    ]);

    return paginate(items, total, { page, limit });
  }

  // ── Histórico por taxista ─────────────────────────────────────────────────

  async findByDriver(
    driverId: string,
    filters: RidesFilterDto,
    params: PaginationParams,
    requester: JwtPayload,
  ) {
    // Taxista só vê as suas próprias corridas
    if (requester.role === 'DRIVER') {
      const driver = await this.prisma.driver.findUnique({
        where: { userId: requester.sub },
      });
      if (!driver || driver.id !== driverId) {
        throw new ForbiddenException(
          'Não autorizado a ver corridas de outro taxista',
        );
      }
    }

    const { skip, take, page, limit } = toPrismaPage(params);
    const where = { ...this.buildWhereClause(filters), driverId };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.ticket.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: RIDE_SELECT,
      }),
      this.prisma.ticket.count({ where }),
    ]);

    return paginate(items, total, { page, limit });
  }

  // ── Detalhe de uma corrida ────────────────────────────────────────────────

  async findOne(ticketId: string, requester: JwtPayload) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
      select: RIDE_SELECT,
    });

    if (!ticket) throw new NotFoundException('Corrida não encontrada');

    // Garante que passageiro e taxista só vêem as suas próprias corridas
    if (
      requester.role === 'PASSENGER' &&
      ticket.passenger.id !== requester.sub
    ) {
      throw new ForbiddenException('Não autorizado');
    }

    if (requester.role === 'DRIVER') {
      const driver = await this.prisma.driver.findUnique({
        where: { userId: requester.sub },
      });
      if (!driver || ticket.driver.id !== driver.id) {
        throw new ForbiddenException('Não autorizado');
      }
    }

    return ticket;
  }

  // ── Sumário diário do taxista ─────────────────────────────────────────────

  async getDailyDriverSummary(driverId: string, date?: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
      include: { user: { select: { name: true } } },
    });
    if (!driver) throw new NotFoundException('Taxista não encontrado');

    const target = date ? new Date(date) : new Date();
    const start = new Date(
      target.getFullYear(),
      target.getMonth(),
      target.getDate(),
    );
    const end = new Date(start.getTime() + 86_400_000);

    const where = { driverId, createdAt: { gte: start, lt: end } };

    // Agrega tudo numa query só
    const [tickets, aggregate] = await this.prisma.$transaction([
      this.prisma.ticket.findMany({
        where,
        select: {
          id: true,
          status: true,
          amount: true,
          usedAt: true,
          passenger: { select: { name: true, phone: true, displayId: true } },
        },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.ticket.aggregate({
        where: { ...where, status: 'USED' },
        _sum: { amount: true },
        _count: true,
      }),
    ]);

    const byStatus = tickets.reduce<Record<string, number>>((acc, t) => {
      acc[t.status] = (acc[t.status] ?? 0) + 1;
      return acc;
    }, {});

    return {
      date: start.toISOString().split('T')[0],
      driverName: driver.user.name,
      licensePlate: driver.licensePlate,
      totalTickets: tickets.length,
      usedTickets: aggregate._count,
      totalReceived: Number(aggregate._sum.amount ?? 0),
      byStatus,
      tickets,
    };
  }

  // ── Sumário mensal do taxista ─────────────────────────────────────────────

  async getMonthlyDriverSummary(
    driverId: string,
    year?: number,
    month?: number,
  ) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
      include: { user: { select: { name: true } } },
    });
    if (!driver) throw new NotFoundException('Taxista não encontrado');

    const now = new Date();
    const y = year ?? now.getFullYear();
    const m = month ?? now.getMonth() + 1;
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 1);

    const where = { driverId, createdAt: { gte: start, lt: end } };

    const [aggregate, byDay] = await this.prisma.$transaction([
      // Totais do mês
      this.prisma.ticket.aggregate({
        where: { ...where, status: 'USED' },
        _sum: { amount: true },
        _count: true,
      }),
      // Agrupamento por dia — raw SQL para GroupBy com date_trunc
      this.prisma.$queryRaw<{ day: Date; count: bigint; total: number }[]>`
        SELECT
          DATE_TRUNC('day', created_at) AS day,
          COUNT(*)::int                 AS count,
          COALESCE(SUM(amount), 0)      AS total
        FROM tickets
        WHERE driver_id    = ${driverId}
          AND status       = 'USED'
          AND created_at  >= ${start}
          AND created_at   < ${end}
        GROUP BY DATE_TRUNC('day', created_at)
        ORDER BY day ASC
      `,
    ]);

    return {
      year,
      month,
      driverName: driver.user.name,
      licensePlate: driver.licensePlate,
      totalUsed: aggregate._count,
      totalReceived: Number(aggregate._sum.amount ?? 0),
      dailyBreakdown: byDay.map((r) => ({
        day: r.day.toISOString().split('T')[0],
        count: Number(r.count),
        total: Number(r.total),
      })),
    };
  }

  // ── Pesquisar passageiro por telefone ou ID (taxista) ─────────────────────

  async findPassenger(query: string) {
    const isPhone = /^\+\d{9,15}$/.test(query);
    const isDisplayId = /^TAX-[A-F0-9]{8}$/.test(query);

    if (!isPhone && !isDisplayId) {
      throw new ForbiddenException(
        'Pesquisa deve ser por telefone (+244...) ou ID (TAX-XXXXXXXX)',
      );
    }

    const user = await this.prisma.user.findFirst({
      where: {
        ...(isPhone ? { phone: query } : {}),
        ...(isDisplayId ? { displayId: query } : {}),
        role: 'PASSENGER',
        isActive: true,
        isBlocked: false,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        displayId: true,
        wallet: { select: { balance: true, currency: true } },
      },
    });

    if (!user) throw new NotFoundException('Passageiro não encontrado');

    return user;
  }

  // ── Helper — constrói cláusula WHERE a partir dos filtros ─────────────────

  private buildWhereClause(filters: RidesFilterDto) {
    return {
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.driverId ? { driverId: filters.driverId } : {}),
      ...(filters.passengerId ? { passengerId: filters.passengerId } : {}),
      ...(filters.from || filters.to
        ? {
            createdAt: {
              ...(filters.from ? { gte: new Date(filters.from) } : {}),
              ...(filters.to ? { lte: new Date(filters.to) } : {}),
            },
          }
        : {}),
    };
  }
}
