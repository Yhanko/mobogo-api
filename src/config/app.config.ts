import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  version: process.env.APP_VERSION ?? '1.0.0',
  name: process.env.APP_NAME ?? 'taxi-api',

  isDev: (process.env.NODE_ENV ?? 'development') === 'development',
  isProd: process.env.NODE_ENV === 'production',

  // CORS — origens permitidas (frontend web, app mobile)
  cors: {
    origins: (process.env.CORS_ORIGINS ?? 'http://localhost:3001')
      .split(',')
      .map((o) => o.trim()),
    credentials: true,
  },

  // Rate limiting global — por IP
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '60000', 10), // 1 minuto
    max: parseInt(process.env.RATE_LIMIT_MAX ?? '120', 10), // 120 req/min
  },

  // Ticket
  ticket: {
    defaultValue: parseFloat(process.env.TICKET_DEFAULT_VALUE ?? '150'), // AOA
    defaultDailyMax: parseInt(
      process.env.TICKET_DEFAULT_DAILY_MAX ?? '200',
      10,
    ),
    expiresInHours: parseInt(process.env.TICKET_EXPIRES_IN_HOURS ?? '24', 10),
  },

  // Paginação
  pagination: {
    defaultLimit: parseInt(process.env.PAGINATION_DEFAULT_LIMIT ?? '20', 10),
    maxLimit: parseInt(process.env.PAGINATION_MAX_LIMIT ?? '100', 10),
  },

  // Swagger — desactivado em produção por defeito
  swagger: {
    enabled:
      process.env.SWAGGER_ENABLED !== 'false' &&
      (process.env.NODE_ENV ?? 'development') !== 'production',
    path: process.env.SWAGGER_PATH ?? 'docs',
    title: 'Taxi API',
    description: 'Documentação da API do sistema de táxi',
  },
}));
