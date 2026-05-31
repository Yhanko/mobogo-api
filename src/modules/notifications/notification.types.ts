// ── Tipos de notificação suportados ──────────────────────────────────────────

export enum NotificationChannel {
  PUSH = 'push', // Firebase FCM — app mobile
  SMS = 'sms', // para utilizadores sem smartphone
}

export enum NotificationEvent {
  // Wallet
  TOPUP_SUCCESS = 'topup.success',
  WITHDRAW_SUCCESS = 'withdraw.success',
  LOW_BALANCE = 'low.balance',
  PAYMENT_RECEIVED = 'payment.received',

  // Tickets
  TICKET_ISSUED = 'ticket.issued',
  TICKET_USED = 'ticket.used',
  TICKET_CANCELLED = 'ticket.cancelled',
  TICKET_RECEIVED = 'ticket.received', // transferência recebida
  TICKET_EXPIRING = 'ticket.expiring', // aviso antes de expirar

  // Conta
  ACCOUNT_BLOCKED = 'account.blocked',
  PASSWORD_CHANGED = 'password.changed',
  DRIVER_ADDED = 'driver.added',
}

// Payload enviado para a fila
export interface NotificationJob {
  userId: string;
  event: NotificationEvent;
  channels: NotificationChannel[];
  data: Record<string, any>; // dados dinâmicos para o template
}

// Template de mensagem por evento
export interface NotificationTemplate {
  title: string;
  body: string;
}
