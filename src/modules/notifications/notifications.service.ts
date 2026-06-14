import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_NAMES, NOTIFICATION_JOBS } from '@/infra/queue/queue.module';
import {
  NotificationJob,
  NotificationEvent,
  NotificationChannel,
} from '@/modules/notifications/notification.types';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectQueue(QUEUE_NAMES.NOTIFICATIONS)
    private readonly queue: Queue,
  ) {}

  // ── API pública — usada pelos outros módulos ──────────────────────────────

  async notifyTopupSuccess(userId: string, amount: number, balance: number) {
    return this.enqueue(userId, NotificationEvent.TOPUP_SUCCESS, {
      amount,
      balance,
    });
  }

  async notifyWithdrawSuccess(userId: string, amount: number, balance: number) {
    return this.enqueue(userId, NotificationEvent.WITHDRAW_SUCCESS, {
      amount,
      balance,
    });
  }

  async notifyLowBalance(userId: string, balance: number) {
    return this.enqueue(userId, NotificationEvent.LOW_BALANCE, { balance });
  }

  async notifyPaymentReceived(
    userId: string,
    amount: number,
    balance: number,
    senderName: string,
  ) {
    return this.enqueue(userId, NotificationEvent.PAYMENT_RECEIVED, {
      amount,
      balance,
      senderName,
    });
  }

  async notifyTicketIssued(userId: string, amount: number, expiresAt: string) {
    return this.enqueue(userId, NotificationEvent.TICKET_ISSUED, {
      amount,
      expiresAt,
    });
  }

  async notifyTicketUsed(userId: string, driverName: string) {
    return this.enqueue(userId, NotificationEvent.TICKET_USED, { driverName });
  }

  async notifyTicketCancelled(userId: string, reason: string) {
    return this.enqueue(userId, NotificationEvent.TICKET_CANCELLED, { reason });
  }

  async notifyTicketReceived(
    userId: string,
    senderName: string,
    amount: number,
  ) {
    return this.enqueue(userId, NotificationEvent.TICKET_RECEIVED, {
      senderName,
      amount,
    });
  }

  async notifyTicketExpiring(userId: string, minutesLeft: number) {
    // Envia com delay — agendado para X minutos antes da expiração
    return this.enqueue(
      userId,
      NotificationEvent.TICKET_EXPIRING,
      { minutesLeft },
      { delay: 0 }, // quem chama calcula o delay correcto
    );
  }

  async notifyAccountBlocked(userId: string) {
    // Alta prioridade — utilizador precisa de saber imediatamente
    return this.enqueue(
      userId,
      NotificationEvent.ACCOUNT_BLOCKED,
      {},
      { priority: 1 },
    );
  }

  async notifyPasswordChanged(userId: string) {
    return this.enqueue(userId, NotificationEvent.PASSWORD_CHANGED, {});
  }

  async notifyDriverAdded(userId: string, driverName: string, plate: string) {
    return this.enqueue(userId, NotificationEvent.DRIVER_ADDED, {
      driverName,
      plate,
    });
  }

  // ── Enqueue interno ───────────────────────────────────────────────────────

  private async enqueue(
    userId: string,
    event: NotificationEvent,
    data: Record<string, any>,
    options: { delay?: number; priority?: number } = {},
  ) {
    const job: NotificationJob = {
      userId,
      event,
      channels: this.resolveChannels(userId),
      data,
    };

    await this.queue.add(NOTIFICATION_JOBS.SEND_PUSH, job, {
      delay: options.delay,
      priority: options.priority,
      jobId: `${event}:${userId}:${Date.now()}`, // evita duplicados
    });

    this.logger.debug(`Notificação enfileirada: ${event} → user ${userId}`);
  }

  /**
   * Decide quais canais usar para o utilizador.
   * Por agora push para todos — no futuro consulta preferências do utilizador.
   * SMS como fallback para utilizadores sem smartphone (displayId).
   */
  private resolveChannels(_userId: string): NotificationChannel[] {
    return [NotificationChannel.PUSH];
  }
}
