import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ── Nomes das filas — fonte de verdade ────────────────────────────────────────
// Importa estes constantes nos producers e consumers para evitar typos

export const QUEUE_NAMES = {
  NOTIFICATIONS: 'notifications',
  REPORTS: 'reports',
  TICKET_EVENTS: 'ticket-events',
  WALLET_EVENTS: 'wallet-events',
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];

// ── Tipos de jobs por fila ────────────────────────────────────────────────────

export const NOTIFICATION_JOBS = {
  SEND_PUSH: 'send-push',
  SEND_SMS: 'send-sms',
  TICKET_USED: 'ticket-used',
  TOPUP_SUCCESS: 'topup-success',
  LOW_BALANCE: 'low-balance',
} as const;

export const REPORT_JOBS = {
  DAILY_DRIVER: 'daily-driver',
  MONTHLY_CLIENT: 'monthly-client',
  EXPORT_PDF: 'export-pdf',
} as const;

export const TICKET_JOBS = {
  EXPIRE_PENDING: 'expire-pending', // job agendado — expira tickets PENDING
  AUDIT: 'audit',
} as const;

export const WALLET_JOBS = {
  PROCESS_TOPUP: 'process-topup',
  PROCESS_WITHDRAW: 'process-withdraw',
} as const;

// ── Módulo ────────────────────────────────────────────────────────────────────

@Module({
  imports: [
    // Configura o BullMQ com Redis — partilha a mesma instância
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          url: config.getOrThrow<string>('REDIS_URL'),
        },
        defaultJobOptions: {
          attempts: 3, // retry automático até 3x
          backoff: {
            type: 'exponential',
            delay: 1_000, // 1s, 2s, 4s
          },
          removeOnComplete: 100, // guarda últimos 100 jobs completos
          removeOnFail: 500, // guarda últimos 500 jobs falhados
        },
      }),
    }),

    // Regista cada fila individualmente
    BullModule.registerQueue(
      { name: QUEUE_NAMES.NOTIFICATIONS },
      { name: QUEUE_NAMES.REPORTS },
      { name: QUEUE_NAMES.TICKET_EVENTS },
      { name: QUEUE_NAMES.WALLET_EVENTS },
    ),
  ],
  exports: [BullModule],
})
export class QueueModule {}
