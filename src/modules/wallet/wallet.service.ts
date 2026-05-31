import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { RedisService } from '../../infrastructure/redis/redis.service';
import { NotificationsService } from '../notifications/notifications.service';
import {
  paginate,
  toPrismaPage,
  PaginationParams,
} from '../../common/utils/pagination.util';
import { TopupDto } from './dto/topup.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { PayTicketDto } from './dto/pay-ticket.dto';
import { Decimal } from '@prisma/client/runtime/library';

// Saldo mínimo permitido após levantamento
const MIN_BALANCE = 0;

// Limite máximo de recarga por operação (protecção anti-fraude)
const MAX_TOPUP_AMOUNT = 500_000;

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly notifications: NotificationsService,
  ) {}

  // ── Ver saldo ─────────────────────────────────────────────────────────────

  async getBalance(userId: string) {
    const wallet = await this.findWalletOrFail(userId);

    return {
      balance: Number(wallet.balance),
      currency: wallet.currency,
      updatedAt: wallet.updatedAt,
    };
  }

  // ── Recarregar carteira ───────────────────────────────────────────────────

  async topup(userId: string, dto: TopupDto) {
    if (dto.amount > MAX_TOPUP_AMOUNT) {
      throw new BadRequestException(
        `Valor máximo de recarga é ${MAX_TOPUP_AMOUNT} AOA por operação`,
      );
    }

    // Mutex distribuído — previne recargas duplicadas simultâneas
    const lockKey = `wallet:lock:topup:${userId}`;
    const locked = await this.redis.setNx(lockKey, '1', 10);
    if (!locked) {
      throw new ConflictException(
        'Operação em curso. Aguarde e tente novamente',
      );
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        const wallet = await tx.wallet.findUnique({
          where: { userId },
        });
        if (!wallet) throw new NotFoundException('Carteira não encontrada');

        const before = Number(wallet.balance);
        const after = before + dto.amount;

        // Actualiza saldo
        const updated = await tx.wallet.update({
          where: { userId },
          data: { balance: after },
        });

        // Regista transacção imutável
        await tx.transaction.create({
          data: {
            walletId: wallet.id,
            type: 'TOPUP',
            amount: dto.amount,
            balanceBefore: before,
            balanceAfter: after,
            reference: dto.reference,
            metadata: { source: 'manual' },
          },
        });

        // Invalida cache do saldo no Redis
        await this.redis.del(`wallet:balance:${userId}`);

        // Notificação assíncrona — não bloqueia a transacção
        this.notifications
          .notifyTopupSuccess(userId, dto.amount, after)
          .catch((err) => this.logger.error('Erro ao notificar topup', err));

        this.logger.log(
          `Topup: user=${userId} amount=${dto.amount} balance=${after}`,
        );

        return {
          balance: Number(updated.balance),
          currency: updated.currency,
          deposited: dto.amount,
        };
      });
    } finally {
      // Liberta o lock sempre — mesmo em caso de erro
      await this.redis.del(lockKey);
    }
  }

  // ── Levantar dinheiro ─────────────────────────────────────────────────────

  async withdraw(userId: string, dto: WithdrawDto) {
    const lockKey = `wallet:lock:withdraw:${userId}`;
    const locked = await this.redis.setNx(lockKey, '1', 10);
    if (!locked) {
      throw new ConflictException(
        'Operação em curso. Aguarde e tente novamente',
      );
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        const wallet = await tx.wallet.findUnique({
          where: { userId },
        });
        if (!wallet) throw new NotFoundException('Carteira não encontrada');

        const before = Number(wallet.balance);

        if (before - dto.amount < MIN_BALANCE) {
          throw new BadRequestException(
            `Saldo insuficiente. Disponível: ${before} AOA`,
          );
        }

        const after = before - dto.amount;

        const updated = await tx.wallet.update({
          where: { userId },
          data: { balance: after },
        });

        await tx.transaction.create({
          data: {
            walletId: wallet.id,
            type: 'WITHDRAWAL',
            amount: dto.amount,
            balanceBefore: before,
            balanceAfter: after,
            reference: dto.reference,
          },
        });

        await this.redis.del(`wallet:balance:${userId}`);

        this.notifications
          .notifyWithdrawSuccess(userId, dto.amount, after)
          .catch((err) => this.logger.error('Erro ao notificar withdraw', err));

        // Verifica saldo baixo após levantamento
        if (after < 100) {
          this.notifications.notifyLowBalance(userId, after).catch(() => {});
        }

        this.logger.log(
          `Withdraw: user=${userId} amount=${dto.amount} balance=${after}`,
        );

        return {
          balance: Number(updated.balance),
          currency: updated.currency,
          withdrawn: dto.amount,
        };
      });
    } finally {
      await this.redis.del(lockKey);
    }
  }

  // ── Pagar ticket via carteira digital ────────────────────────────────────

  async payTicket(userId: string, dto: PayTicketDto) {
    const lockKey = `wallet:lock:pay:${userId}:${dto.ticketId}`;
    const locked = await this.redis.setNx(lockKey, '1', 30);
    if (!locked) {
      throw new ConflictException('Pagamento já em processamento');
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        // Valida ticket
        const ticket = await tx.ticket.findUnique({
          where: { id: dto.ticketId },
          include: {
            driver: {
              select: {
                id: true,
                user: { select: { id: true, name: true } },
              },
            },
          },
        });

        if (!ticket) throw new NotFoundException('Ticket não encontrado');
        if (ticket.passengerId !== userId) {
          throw new BadRequestException('Este ticket não pertence a si');
        }
        if (ticket.status !== 'PENDING') {
          throw new ConflictException(
            `Ticket já se encontra "${ticket.status}"`,
          );
        }
        if (new Date() > ticket.expiresAt) {
          throw new BadRequestException('Ticket expirado');
        }

        // Valida saldo do passageiro
        const passengerWallet = await tx.wallet.findUnique({
          where: { userId },
        });
        if (!passengerWallet)
          throw new NotFoundException('Carteira não encontrada');

        const passengerBefore = Number(passengerWallet.balance);
        const amount = Number(ticket.amount);

        if (passengerBefore < amount) {
          throw new BadRequestException(
            `Saldo insuficiente. Necessário: ${amount} AOA | Disponível: ${passengerBefore} AOA`,
          );
        }

        const passengerAfter = passengerBefore - amount;

        // Carteira do taxista
        const driverWallet = await tx.wallet.findUnique({
          where: { userId: ticket.driver.user.id },
        });
        if (!driverWallet)
          throw new NotFoundException('Carteira do taxista não encontrada');

        const driverBefore = Number(driverWallet.balance);
        const driverAfter = driverBefore + amount;

        // Executa as 5 operações atomicamente
        const [updatedPassengerWallet] = await Promise.all([
          // 1. Debita passageiro
          tx.wallet.update({
            where: { userId },
            data: { balance: passengerAfter },
          }),
          // 2. Credita taxista
          tx.wallet.update({
            where: { userId: ticket.driver.user.id },
            data: { balance: driverAfter },
          }),
          // 3. Marca ticket como USED
          tx.ticket.update({
            where: { id: dto.ticketId },
            data: { status: 'USED', usedAt: new Date() },
          }),
          // 4. Transacção de saída (passageiro)
          tx.transaction.create({
            data: {
              walletId: passengerWallet.id,
              ticketId: dto.ticketId,
              type: 'PAYMENT',
              amount,
              balanceBefore: passengerBefore,
              balanceAfter: passengerAfter,
              metadata: { driverId: ticket.driver.id },
            },
          }),
          // 5. Transacção de entrada (taxista)
          tx.transaction.create({
            data: {
              walletId: driverWallet.id,
              ticketId: dto.ticketId,
              type: 'PAYMENT',
              amount,
              balanceBefore: driverBefore,
              balanceAfter: driverAfter,
              metadata: { passengerId: userId },
            },
          }),
        ]);

        // Invalida caches
        await Promise.all([
          this.redis.del(`wallet:balance:${userId}`),
          this.redis.del(`wallet:balance:${ticket.driver.user.id}`),
        ]);

        // Notificações assíncronas
        this.notifications
          .notifyPaymentReceived(
            ticket.driver.user.id,
            amount,
            driverAfter,
            'Passageiro',
          )
          .catch(() => {});

        if (passengerAfter < 100) {
          this.notifications
            .notifyLowBalance(userId, passengerAfter)
            .catch(() => {});
        }

        this.logger.log(
          `Pagamento: ticket=${dto.ticketId} amount=${amount} ` +
            `passenger=${userId}(${passengerAfter}) driver=${ticket.driver.id}(${driverAfter})`,
        );

        return {
          paid: amount,
          passengerBalance: Number(updatedPassengerWallet.balance),
          currency: updatedPassengerWallet.currency,
        };
      });
    } finally {
      await this.redis.del(lockKey);
    }
  }

  // ── Histórico de transacções ──────────────────────────────────────────────

  async getHistory(userId: string, params: PaginationParams) {
    const wallet = await this.findWalletOrFail(userId);

    const { skip, take, page, limit } = toPrismaPage(params);

    const where = { walletId: wallet.id };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          type: true,
          amount: true,
          balanceBefore: true,
          balanceAfter: true,
          reference: true,
          createdAt: true,
          ticket: {
            select: {
              id: true,
              driver: { select: { licensePlate: true } },
            },
          },
        },
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return paginate(items, total, { page, limit });
  }

  // ── Saldo do taxista (corridas do mês) ────────────────────────────────────

  async getDriverMonthlyBalance(driverId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
      include: { user: { select: { id: true } } },
    });
    if (!driver) throw new NotFoundException('Taxista não encontrado');

    const wallet = await this.findWalletOrFail(driver.user.id);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Soma total recebido no mês via pagamentos de tickets
    const monthly = await this.prisma.transaction.aggregate({
      where: {
        walletId: wallet.id,
        type: 'PAYMENT',
        createdAt: { gte: startOfMonth },
      },
      _sum: { amount: true },
      _count: true,
    });

    return {
      currentBalance: Number(wallet.balance),
      monthlyReceived: Number(monthly._sum.amount ?? 0),
      monthlyTickets: monthly._count,
      currency: wallet.currency,
    };
  }

  // ── Helper privado ────────────────────────────────────────────────────────

  private async findWalletOrFail(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });
    if (!wallet) throw new NotFoundException('Carteira não encontrada');
    return wallet;
  }
}
