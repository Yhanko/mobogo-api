import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,

  // Pool de conexões — crítico para 5000+ táxis em produção
  pool: {
    min: parseInt(process.env.DB_POOL_MIN ?? '2', 10),
    max: parseInt(process.env.DB_POOL_MAX ?? '10', 10),
    acquireTimeout: parseInt(
      process.env.DB_POOL_ACQUIRE_TIMEOUT ?? '30000',
      10,
    ),
    idleTimeout: parseInt(process.env.DB_POOL_IDLE_TIMEOUT ?? '600000', 10),
  },

  // Log de queries — apenas em desenvolvimento
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['error'],
}));
