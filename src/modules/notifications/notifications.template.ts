import { NotificationEvent, NotificationTemplate } from './notifications.types';

// Preenche variáveis no template: "Olá {name}" + { name: 'João' } → "Olá João"
export function renderTemplate(
  template: string,
  vars: Record<string, any>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`,
  );
}

export const NOTIFICATION_TEMPLATES: Record<
  NotificationEvent,
  NotificationTemplate
> = {
  [NotificationEvent.TOPUP_SUCCESS]: {
    title: 'Recarga efectuada',
    body: 'A sua carteira foi recarregada com {amount} AOA. Saldo actual: {balance} AOA.',
  },
  [NotificationEvent.WITHDRAW_SUCCESS]: {
    title: 'Levantamento efectuado',
    body: 'Levantamento de {amount} AOA efectuado. Saldo actual: {balance} AOA.',
  },
  [NotificationEvent.LOW_BALANCE]: {
    title: 'Saldo baixo',
    body: 'O seu saldo é de {balance} AOA. Recarregue para continuar a usar o serviço.',
  },
  [NotificationEvent.PAYMENT_RECEIVED]: {
    title: 'Pagamento recebido',
    body: 'Recebeu {amount} AOA de {senderName}. Saldo actual: {balance} AOA.',
  },
  [NotificationEvent.TICKET_ISSUED]: {
    title: 'Passagem emitida',
    body: 'A sua passagem foi emitida. Valor: {amount} AOA. Válida até: {expiresAt}.',
  },
  [NotificationEvent.TICKET_USED]: {
    title: 'Passagem utilizada',
    body: 'A sua passagem foi validada pelo taxista {driverName}.',
  },
  [NotificationEvent.TICKET_CANCELLED]: {
    title: 'Passagem cancelada',
    body: 'A sua passagem foi cancelada. Motivo: {reason}.',
  },
  [NotificationEvent.TICKET_RECEIVED]: {
    title: 'Passagem recebida',
    body: 'Recebeu uma passagem transferida de {senderName}. Valor: {amount} AOA.',
  },
  [NotificationEvent.TICKET_EXPIRING]: {
    title: 'Passagem a expirar',
    body: 'A sua passagem expira em {minutesLeft} minutos. Use-a antes que expire.',
  },
  [NotificationEvent.ACCOUNT_BLOCKED]: {
    title: 'Conta bloqueada',
    body: 'A sua conta foi bloqueada. Contacte o suporte para mais informações.',
  },
  [NotificationEvent.PASSWORD_CHANGED]: {
    title: 'Password alterada',
    body: 'A sua password foi alterada com sucesso. Se não foi você, contacte o suporte.',
  },
  [NotificationEvent.DRIVER_ADDED]: {
    title: 'Motorista adicionado',
    body: 'O motorista {driverName} ({plate}) foi adicionado à sua conta.',
  },
};
