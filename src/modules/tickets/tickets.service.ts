import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { QrService } from '@/modules/tickets/qr/qr.service';
import { generateShortCode } from '@/common/utils/crypto.util';
import {
  paginate,
  toPrismaPage,
  PaginationParams,
} from '@/common/utils/pagination.util';
import { CreateTicketDto } from '@/modules/tickets/dto/create-ticket.dto';
import { CancelTicketDto } from '@/modules/tickets/dto/cancel-ticket.dto';
import { TransferTicketDto } from '@/modules/tickets/dto/transfer.dto';
import { ScanTicketDto, ScanMode } from '@/modules/tickets/dto/scan.dto';
import { JwtPayload } from '@/common/types/jwt-payload.type';
import { randomBytes } from 'crypto';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly qrService: QrService,
    private readonly notifications: NotificationsService,
    private readonly config: ConfigService,
  ) {}

  // ── Criar ticket ──────────────────────────────────────────────────────────

  async create(dto: CreateTicketDto, issuedBy: JwtPayload) {
    // Verifica se o passageiro existe e está activo
    const passenger = await this.prisma.user.findUnique({
      where: { id: dto.passengerId, isActive: true, isBlocked: false },
    });
    if (!passenger)
      throw new NotFoundException('Passageiro não encontrado ou bloqueado');

    // Verifica se o taxista existe e está activo
    const driver = await this.prisma.driver.findUnique({
      where: { id: dto.driverId },
      include: { user: { select: { name: true } } },
    });
    if (!driver || driver.status === 'BLOCKED') {
      throw new NotFoundException('Taxista não encontrado ou inactivo');
    }

    // Verifica limite diário do agente se for agente a emitir
    if (issuedBy.role === 'AGENT') {
      await this.checkAgentDailyLimit(issuedBy.sub);
    }

    const amount =
      dto.amount ?? this.config.get<number>('TICKET_DEFAULT_VALUE', 150);

    const expiresAt = new Date(
      Date.now() +
        this.config.get<number>('TICKET_EXPIRES_IN_HOURS', 24) * 3_600_000,
    );

    // Gera identificadores únicos
    const qrNonce = randomBytes(16).toString('hex');
    const shortCode = await this.generateUniqueShortCode();

    const ticket = await this.prisma.ticket.create({
      data: {
        passengerId: dto.passengerId,
        driverId: dto.driverId,
        issuedById: issuedBy.sub,
        amount,
        status: 'PENDING',
        qrNonce,
        shortCode,
        expiresAt,
      },
      include: {
        passenger: { select: { name: true, phone: true } },
        driver: {
          select: { licensePlate: true, user: { select: { name: true } } },
        },
      },
    });

    // Notifica o passageiro
    await this.notifications.notifyTicketIssued(
      dto.passengerId,
      amount,
      expiresAt.toLocaleString('pt-AO'),
    );

    this.logger.log(
      `Ticket criado: ${ticket.id} | passageiro: ${dto.passengerId} | taxista: ${dto.driverId}`,
    );

    return ticket;
  }

  // ── Gerar conteúdo QR (chamado a cada render no app) ─────────────────────

  async getQrContent(ticketId: string, requesterId: string) {
    const ticket = await this.findTicketOrFail(ticketId);

    // Só o dono do ticket pode gerar o QR
    if (ticket.passengerId !== requesterId) {
      throw new ForbiddenException('Não autorizado a ver este ticket');
    }

    if (ticket.status !== 'PENDING') {
      throw new BadRequestException(
        `Ticket com estado "${ticket.status}" não pode ser usado`,
      );
    }

    if (new Date() > ticket.expiresAt) {
      throw new BadRequestException('Ticket expirado');
    }

    return {
      qrContent: this.qrService.generateQrContent(ticketId, ticket.createdAt),
      shortCode: ticket.shortCode,
      expiresAt: ticket.expiresAt,
      amount: ticket.amount,
    };
  }

  // ── Validar / usar ticket (taxista) ───────────────────────────────────────

  async scan(dto: ScanTicketDto, driverId: string) {
    let ticketId: string;

    if (dto.mode === ScanMode.QR) {
      // Validação pelo QR — busca ticket pelo nonce embebido no QR
      const decoded = this.qrService.decodeQrContent(dto.value);
      ticketId = decoded.tid;

      const ticket = await this.findTicketOrFail(ticketId);
      await this.qrService.validateQrScan(dto.value, ticket.createdAt);
    } else {
      // Validação pelo short code
      const ticket = await this.prisma.ticket.findUnique({
        where: { shortCode: dto.value },
      });
      if (!ticket) throw new NotFoundException('Código inválido');

      ticketId = ticket.id;
      await this.qrService.validateShortCode(dto.value, ticketId);
    }

    return this.useTicket(ticketId, driverId);
  }

  // ── Cancelar ticket ───────────────────────────────────────────────────────

  async cancel(
    ticketId: string,
    dto: CancelTicketDto,
    cancelledBy: JwtPayload,
  ) {
    const ticket = await this.findTicketOrFail(ticketId);

    if (ticket.status !== 'PENDING') {
      throw new BadRequestException(
        `Não é possível cancelar ticket com estado "${ticket.status}"`,
      );
    }

    // Taxista só cancela os seus próprios tickets
    if (cancelledBy.role === 'DRIVER' && ticket.driverId !== cancelledBy.sub) {
      throw new ForbiddenException('Não autorizado a cancelar este ticket');
    }

    const updated = await this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status: 'CANCELLED',
        cancelReason: dto.reason,
        cancelledById: cancelledBy.sub,
      },
    });

    await this.notifications.notifyTicketCancelled(
      ticket.passengerId,
      dto.reason,
    );

    return updated;
  }

  // ── Transferir ticket ─────────────────────────────────────────────────────

  async transfer(
    ticketId: string,
    dto: TransferTicketDto,
    requesterId: string,
  ) {
    if (!dto.toPhone && !dto.toDisplayId) {
      throw new BadRequestException('Forneça telefone ou ID do destinatário');
    }

    const ticket = await this.findTicketOrFail(ticketId);

    if (ticket.passengerId !== requesterId) {
      throw new ForbiddenException('Só o dono pode transferir o ticket');
    }

    if (ticket.status !== 'PENDING') {
      throw new BadRequestException(
        'Só tickets pendentes podem ser transferidos',
      );
    }

    // Localiza o destinatário
    const recipient = await this.prisma.user.findFirst({
      where: {
        ...(dto.toPhone ? { phone: dto.toPhone } : {}),
        ...(dto.toDisplayId ? { displayId: dto.toDisplayId } : {}),
        isActive: true,
        isBlocked: false,
      },
    });

    if (!recipient) throw new NotFoundException('Destinatário não encontrado');
    if (recipient.id === requesterId) {
      throw new BadRequestException('Não pode transferir para si mesmo');
    }

    const [updated] = await this.prisma.$transaction([
      this.prisma.ticket.update({
        where: { id: ticketId },
        data: {
          passengerId: recipient.id,
          status: 'TRANSFERRED',
          transferredToId: recipient.id,
          transferredAt: new Date(),
        },
      }),
    ]);

    // Notifica sender e recipient
    const sender = await this.prisma.user.findUnique({
      where: { id: requesterId },
      select: { name: true },
    });

    await this.notifications.notifyTicketReceived(
      recipient.id,
      sender?.name ?? 'Utilizador',
      Number(ticket.amount),
    );

    return updated;
  }

  // ── Histórico Global (Admin) ──────────────────────────────────────────────

  async findAll(params: PaginationParams) {
    const { skip, take, page, limit } = toPrismaPage(params);

    const [items, total] = await this.prisma.$transaction([
      this.prisma.ticket.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          passenger: { select: { name: true, phone: true } },
          driver: {
            select: { licensePlate: true, user: { select: { name: true } } },
          },
        },
      }),
      this.prisma.ticket.count(),
    ]);

    return paginate(items, total, { page, limit });
  }

  // ── Histórico por passageiro ──────────────────────────────────────────────

  async findByPassenger(passengerId: string, params: PaginationParams) {
    const { skip, take, page, limit } = toPrismaPage(params);

    const where = { passengerId };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.ticket.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          driver: {
            select: { licensePlate: true, user: { select: { name: true } } },
          },
        },
      }),
      this.prisma.ticket.count({ where }),
    ]);

    return paginate(items, total, { page, limit });
  }

  // ── Histórico por taxista ─────────────────────────────────────────────────

  async findByDriver(
    driverId: string,
    params: PaginationParams,
    period?: 'day' | 'month',
  ) {
    const { skip, take, page, limit } = toPrismaPage(params);

    const now = new Date();
    const start =
      period === 'day'
        ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
        : period === 'month'
          ? new Date(now.getFullYear(), now.getMonth(), 1)
          : undefined;

    const where = {
      driverId,
      ...(start ? { createdAt: { gte: start } } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.ticket.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          passenger: { select: { name: true, phone: true, displayId: true } },
        },
      }),
      this.prisma.ticket.count({ where }),
    ]);

    return paginate(items, total, { page, limit });
  }

  // ── Helpers privados ──────────────────────────────────────────────────────

  private async useTicket(ticketId: string, driverId: string) {
    const ticket = await this.findTicketOrFail(ticketId);

    if (ticket.status !== 'PENDING') {
      throw new ConflictException(`Ticket já se encontra "${ticket.status}"`);
    }

    if (new Date() > ticket.expiresAt) {
      await this.prisma.ticket.update({
        where: { id: ticketId },
        data: { status: 'EXPIRED' },
      });
      throw new BadRequestException('Ticket expirado');
    }

    // Marca como usado — transacção atómica
    const used = await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { status: 'USED', usedAt: new Date() },
      include: {
        passenger: { select: { name: true } },
        driver: { select: { user: { select: { name: true } } } },
      },
    });

    await this.notifications.notifyTicketUsed(
      ticket.passengerId,
      used.driver.user.name,
    );

    return used;
  }

  private async findTicketOrFail(ticketId: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
    });
    if (!ticket) throw new NotFoundException('Ticket não encontrado');
    return ticket;
  }

  private async checkAgentDailyLimit(agentUserId: string) {
    const agent = await this.prisma.agent.findUnique({
      where: { userId: agentUserId },
    });
    if (!agent) throw new ForbiddenException('Perfil de agente não encontrado');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const count = await this.prisma.ticket.count({
      where: {
        issuedById: agentUserId,
        createdAt: { gte: today },
      },
    });

    if (count >= agent.dailyTicketLimit) {
      throw new ForbiddenException(
        `Limite diário de ${agent.dailyTicketLimit} tickets atingido`,
      );
    }
  }

  private async generateUniqueShortCode(): Promise<string> {
    // Garante unicidade tentando até 5 vezes
    for (let i = 0; i < 5; i++) {
      const code = generateShortCode(6);
      const exists = await this.prisma.ticket.findUnique({
        where: { shortCode: code },
      });
      if (!exists) return code;
    }
    throw new Error('Falha ao gerar short code único');
  }
}
