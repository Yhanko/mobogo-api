import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { QUEUE_NAMES } from '@/infra/queue/queue.module';
import {
  NotificationJob,
  NotificationChannel,
} from '@/modules/notifications/notification.types';
import {
  NOTIFICATION_TEMPLATES,
  renderTemplate,
} from '@/modules/notifications/notifications.template';

@Processor(QUEUE_NAMES.NOTIFICATIONS)
export class NotificationsProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationsProcessor.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<NotificationJob>): Promise<void> {
    const { userId, event, channels, data } = job.data;

    const template = NOTIFICATION_TEMPLATES[event];
    if (!template) {
      this.logger.warn(`Template não encontrado para evento: ${event}`);
      return;
    }

    const title = renderTemplate(template.title, data);
    const body = renderTemplate(template.body, data);

    // Processa cada canal em paralelo
    await Promise.allSettled(
      channels.map((channel) => this.send(channel, userId, title, body, data)),
    );
  }

  // ── Dispatcher por canal ──────────────────────────────────────────────────

  private async send(
    channel: NotificationChannel,
    userId: string,
    title: string,
    body: string,
    data: Record<string, any>,
  ): Promise<void> {
    switch (channel) {
      case NotificationChannel.PUSH:
        return this.sendPush(userId, title, body, data);
      case NotificationChannel.SMS:
        return this.sendSms(userId, body);
    }
  }

  // ── Push (Firebase FCM) ───────────────────────────────────────────────────

  private async sendPush(
    userId: string,
    title: string,
    body: string,
    data: Record<string, any>,
  ): Promise<void> {
    // Busca FCM token do utilizador
    // (campo fcmToken seria adicionado ao schema User em produção)
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true },
    });

    if (!user) return;

    // Em produção: await firebase.messaging().send({ token, notification, data })
    // Por agora simula o envio com log estruturado
    this.logger.log({
      channel: 'push',
      userId,
      title,
      body,
      data,
    });
  }

  // ── SMS ───────────────────────────────────────────────────────────────────

  private async sendSms(userId: string, body: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { phone: true },
    });

    if (!user?.phone) return;

    // Em produção: integra com Twilio, AfricasTalking, ou operadora local
    // await smsProvider.send({ to: user.phone, message: body })
    this.logger.log({
      channel: 'sms',
      to: user.phone,
      body,
    });
  }
}
