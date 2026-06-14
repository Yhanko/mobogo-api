import { registerAs } from '@nestjs/config';
import { env } from './env.config';

export default registerAs('app', () => ({
  env: env.ENVIRONMENT,
  port: env.PORT,
  version: env.APP_VERSION,
  name: env.APP_NAME,

  isDev: env.ENVIRONMENT === 'development',
  isProd: env.ENVIRONMENT === 'production',

  // CORS — origens permitidas (frontend web, app mobile)
  cors: {
    origins: (env.CORS_ORIGINS)
      .split(',')
      .map((o) => o.trim()),
    credentials: true,
  },

  // Rate limiting global — por IP
  rateLimit: {
    windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS, 10), // 1 minuto
    max: parseInt(env.RATE_LIMIT_MAX, 10), // 120 req/min
  },

  // Ticket
  ticket: {
    defaultValue: parseFloat(env.TICKET_DEFAULT_VALUE), // AOA
    defaultDailyMax: parseInt(
      env.TICKET_DEFAULT_DAILY_MAX,
      10,
    ),
    expiresInHours: parseInt(env.TICKET_EXPIRES_IN_HOURS, 10),
  },

  // Paginação
  pagination: {
    defaultLimit: parseInt(env.PAGINATION_DEFAULT_LIMIT, 10),
    maxLimit: parseInt(env.PAGINATION_MAX_LIMIT, 10),
  },

  // Swagger — desactivado em produção por defeito
  swagger: {
    enabled:
      env.SWAGGER_ENABLED !== 'false' &&
      env.ENVIRONMENT !== 'production',
    path: env.SWAGGER_PATH,
    title: 'mobogo-api',
    description: 'Documentação da API do sistema de táxi',
  },
}));
