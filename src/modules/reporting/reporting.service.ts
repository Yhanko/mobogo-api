import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import {
  ReportFilterDto,
  ReportPeriod,
  ReportFormat,
} from './dto/report-filter.dto';

@Injectable()
export class ReportingService {
  private readonly logger = new Logger(ReportingService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ── Resumo geral do sistema — admin ───────────────────────────────────────

  async getSystemSummary(filters: ReportFilterDto) {
    const { start, end } = this.resolveDateRange(filters);

    const [ticketStats, walletStats, activeDrivers, newUsers] =
      await this.prisma.$transaction([
        // Tickets por status no período
        this.prisma.$queryRaw<
          { status: string; count: bigint; total: number }[]
        >`
        SELECT
          status,
          COUNT(*)::int        AS count,
          COALESCE(SUM(amount), 0) AS total
        FROM tickets
        WHERE created_at >= ${start}
          AND created_at <  ${end}
        GROUP BY status
      `,

        // Movimentações financeiras no período
        this.prisma.$queryRaw<{ type: string; count: bigint; total: number }[]>`
        SELECT
          type,
          COUNT(*)::int            AS count,
          COALESCE(SUM(amount), 0) AS total
        FROM transactions
        WHERE created_at >= ${start}
          AND created_at <  ${end}
        GROUP BY type
      `,

        // Taxistas activos (com pelo menos 1 ticket no período)
        this.prisma.driver.count({
          where: {
            ticketsReceived: {
              some: { createdAt: { gte: start, lt: end } },
            },
          },
        }),

        // Novos utilizadores no período
        this.prisma.user.count({
          where: { createdAt: { gte: start, lt: end } },
        }),
      ]);

    return {
      period: { start, end },
      tickets: ticketStats.map((r) => ({
        status: r.status,
        count: Number(r.count),
        total: Number(r.total),
      })),
      transactions: walletStats.map((r) => ({
        type: r.type,
        count: Number(r.count),
        total: Number(r.total),
      })),
      activeDrivers,
      newUsers,
    };
  }

  // ── Relatório diário de um taxista — agente/cliente ───────────────────────

  async getDailyDriverReport(driverId: string, filters: ReportFilterDto) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
      include: { user: { select: { name: true } } },
    });
    if (!driver) throw new NotFoundException('Taxista não encontrado');

    const { start, end } = this.resolveDateRange(filters);

    const [tickets, aggregate, walletMovements] =
      await this.prisma.$transaction([
        this.prisma.ticket.findMany({
          where: {
            driverId,
            createdAt: { gte: start, lt: end },
          },
          select: {
            id: true,
            status: true,
            amount: true,
            createdAt: true,
            usedAt: true,
            cancelReason: true,
            passenger: {
              select: { name: true, phone: true, displayId: true },
            },
          },
          orderBy: { createdAt: 'asc' },
        }),

        this.prisma.ticket.aggregate({
          where: {
            driverId,
            status: 'USED',
            createdAt: { gte: start, lt: end },
          },
          _sum: { amount: true },
          _count: true,
        }),

        // Movimentações da carteira do taxista no período
        this.prisma.$queryRaw<{ type: string; total: number; count: bigint }[]>`
        SELECT
          t.type,
          COALESCE(SUM(t.amount), 0) AS total,
          COUNT(*)::int              AS count
        FROM transactions t
        INNER JOIN wallets w ON w.id = t.wallet_id
        INNER JOIN users   u ON u.id = w.user_id
        INNER JOIN drivers d ON d.user_id = u.id
        WHERE d.id           = ${driverId}
          AND t.created_at  >= ${start}
          AND t.created_at   < ${end}
        GROUP BY t.type
      `,
      ]);

    const report = {
      date: start.toISOString().split('T')[0],
      driver: {
        id: driver.id,
        name: driver.user.name,
        licensePlate: driver.licensePlate,
      },
      summary: {
        totalTickets: tickets.length,
        usedTickets: aggregate._count,
        cancelledTickets: tickets.filter((t) => t.status === 'CANCELLED')
          .length,
        totalReceived: Number(aggregate._sum.amount ?? 0),
      },
      walletMovements: walletMovements.map((r) => ({
        type: r.type,
        count: Number(r.count),
        total: Number(r.total),
      })),
      tickets,
    };

    if (filters.format === ReportFormat.CSV) {
      return this.toCsv(report.tickets, [
        'id',
        'status',
        'amount',
        'createdAt',
        'usedAt',
        'cancelReason',
        'passenger.name',
        'passenger.phone',
      ]);
    }

    return report;
  }

  // ── Relatório mensal do cliente ───────────────────────────────────────────

  async getClientMonthlyReport(clientId: string, filters: ReportFilterDto) {
    const client = await this.prisma.user.findUnique({
      where: { id: clientId, role: 'CLIENT' },
    });
    if (!client) throw new NotFoundException('Cliente não encontrado');

    const { start, end } = this.resolveDateRange({
      ...filters,
      period: ReportPeriod.MONTH,
    });

    // Todos os taxistas do cliente
    const drivers = await this.prisma.driver.findMany({
      where: { clientId },
      include: { user: { select: { name: true } } },
    });

    // Para cada taxista, agrega os tickets no período
    const driversReport = await Promise.all(
      drivers.map(async (d) => {
        const agg = await this.prisma.ticket.aggregate({
          where: {
            driverId: d.id,
            status: 'USED',
            createdAt: { gte: start, lt: end },
          },
          _sum: { amount: true },
          _count: true,
        });

        return {
          driverId: d.id,
          driverName: d.user.name,
          licensePlate: d.licensePlate,
          usedTickets: agg._count,
          totalReceived: Number(agg._sum.amount ?? 0),
        };
      }),
    );

    const grandTotal = driversReport.reduce(
      (sum, d) => sum + d.totalReceived,
      0,
    );

    const report = {
      period: { start, end },
      clientName: client.name,
      totalDrivers: drivers.length,
      activeDrivers: driversReport.filter((d) => d.usedTickets > 0).length,
      grandTotal,
      drivers: driversReport.sort((a, b) => b.totalReceived - a.totalReceived),
    };

    if (filters.format === ReportFormat.CSV) {
      return this.toCsv(report.drivers, [
        'driverName',
        'licensePlate',
        'usedTickets',
        'totalReceived',
      ]);
    }

    return report;
  }

  // ── Relatório de agentes — admin ──────────────────────────────────────────

  async getAgentsReport(filters: ReportFilterDto) {
    const { start, end } = this.resolveDateRange(filters);

    const agents = await this.prisma.agent.findMany({
      include: { user: { select: { name: true, phone: true } } },
    });

    const agentsReport = await Promise.all(
      agents.map(async (a) => {
        const [issued, byStatus] = await this.prisma.$transaction([
          this.prisma.ticket.count({
            where: {
              issuedById: a.userId,
              createdAt: { gte: start, lt: end },
            },
          }),
          this.prisma.$queryRaw<{ status: string; count: bigint }[]>`
            SELECT status, COUNT(*)::int AS count
            FROM tickets
            WHERE issued_by_id = ${a.userId}
              AND created_at  >= ${start}
              AND created_at   < ${end}
            GROUP BY status
          `,
        ]);

        return {
          agentId: a.id,
          agentName: a.user.name,
          phone: a.user.phone,
          dailyLimit: a.dailyTicketLimit,
          isActive: a.isActive,
          issued,
          usagePercent:
            a.dailyTicketLimit > 0
              ? Math.round((issued / a.dailyTicketLimit) * 100)
              : 0,
          byStatus: byStatus.map((r) => ({
            status: r.status,
            count: Number(r.count),
          })),
        };
      }),
    );

    return {
      period: { start, end },
      agents: agentsReport.sort((a, b) => b.issued - a.issued),
      totalIssued: agentsReport.reduce((s, a) => s + a.issued, 0),
    };
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  resolveDateRange(filters: ReportFilterDto): { start: Date; end: Date } {
    const now = new Date();

    if (filters.period === ReportPeriod.RANGE && filters.from && filters.to) {
      return { start: new Date(filters.from), end: new Date(filters.to) };
    }

    switch (filters.period) {
      case ReportPeriod.WEEK: {
        const start = new Date(now);
        start.setDate(now.getDate() - 7);
        start.setHours(0, 0, 0, 0);
        return { start, end: now };
      }
      case ReportPeriod.MONTH: {
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        return { start, end: now };
      }
      default: {
        // DAY — hoje
        const start = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
        );
        return { start, end: now };
      }
    }
  }

  // Converte array de objectos planos em CSV
  private toCsv(rows: any[], fields: string[]): string {
    const header = fields.join(',');
    const lines = rows.map((row) =>
      fields
        .map((f) => {
          // Suporta campos nested como "passenger.name"
          const val = f.split('.').reduce((o, k) => o?.[k], row);
          const str = val == null ? '' : String(val);
          // Escapa aspas e envolve em aspas se tiver vírgula
          return str.includes(',') ? `"${str.replace(/"/g, '""')}"` : str;
        })
        .join(','),
    );
    return [header, ...lines].join('\n');
  }
}
