import 'dotenv/config';

type Environment = 'development' | 'test' | 'production';
type DatabaseClient = 'mysql' | 'pg';

function getEnvValue(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Variável de ambiente "${name}" não encontrada.`);
  }

  return value;
}

function getEnvEnum<T extends string>(
  name: string,
  allowedValues: readonly T[],
  fallback: T,
): T {
  const value = process.env[name];

  if (!value) {
    return fallback;
  }

  if (allowedValues.includes(value as T)) {
    return value as T;
  }

  throw new Error(
    `Variável de ambiente "${name}" inválida. Valores permitidos: ${allowedValues.join(
      ', ',
    )}.`,
  );
}

const environmentValues = ['development', 'test', 'production'] as const;
const databaseClients = ['mysql', 'pg'] as const;

const env = {
  ENVIRONMENT: getEnvEnum('ENVIRONMENT', environmentValues, 'development'),
  PORT: Number(process.env.PORT ?? '8000'),
  DATABASE_URL: getEnvValue('DATABASE_URL'),
  DATABASE_CLIENT: getEnvEnum('DATABASE_CLIENT', databaseClients, 'pg'),
  JWT_SECRET: getEnvValue('JWT_SECRET'),
  API_PUBLIC_URL: getEnvValue('API_PUBLIC_URL'),
  API_ORIGINS: getEnvValue('API_ORIGINS'),
  MOOBGO_TOKEN: getEnvValue('MOOBGO_TOKEN'),
  REDIS_URL: getEnvValue('REDIS_URL'),
  JWT_ACCESS_EXPIRES: getEnvValue('JWT_ACCESS_EXPIRES'),
  JWT_REFRESH_EXPIRES: getEnvValue('JWT_REFRESH_EXPIRES'),
  QR_HMAC_SECRET: getEnvValue('QR_HMAC_SECRET'),
  APP_VERSION: getEnvValue('APP_VERSION'),
  APP_NAME: getEnvValue('APP_NAME'),
  JWT_ROTATION_ENABLED: getEnvValue('JWT_ROTATION_ENABLED'),
  JWT_ISSUER: getEnvValue('JWT_ISSUER'),
  JWT_AUDIENCE: getEnvValue('JWT_AUDIENCE'),
  REDIS_TTL_SESSION: getEnvValue('REDIS_TTL_SESSION'),
  REDIS_TTL_REFRESH: getEnvValue('REDIS_TTL_REFRESH'),
  REDIS_TTL_QR: getEnvValue('REDIS_TTL_QR'),
  REDIS_TTL_USED_TICKET: getEnvValue('REDIS_TTL_USED_TICKET'),
  REDIS_TTL_PERM_CACHE: getEnvValue('REDIS_TTL_PERM_CACHE'),
  REDIS_TTL_SHORT_CODE: getEnvValue('REDIS_TTL_SHORT_CODE'),
  REDIS_TTL_GPS: getEnvValue('REDIS_TTL_GPS'),
  CORS_ORIGINS: getEnvValue('CORS_ORIGINS'),
  RATE_LIMIT_WINDOW_MS: getEnvValue('RATE_LIMIT_WINDOW_MS'),
  RATE_LIMIT_MAX: getEnvValue('RATE_LIMIT_MAX'),
  TICKET_DEFAULT_VALUE: getEnvValue('TICKET_DEFAULT_VALUE'),
  TICKET_DEFAULT_DAILY_MAX: getEnvValue('TICKET_DEFAULT_DAILY_MAX'),
  TICKET_EXPIRES_IN_HOURS: getEnvValue('TICKET_EXPIRES_IN_HOURS'),
  DB_POOL_MIN: getEnvValue('DB_POOL_MIN'),
  DB_POOL_MAX: getEnvValue('DB_POOL_MAX'),
  DB_POOL_ACQUIRE_TIMEOUT: getEnvValue('DB_POOL_ACQUIRE_TIMEOUT'),
  DB_POOL_IDLE_TIMEOUT: getEnvValue('DB_POOL_IDLE_TIMEOUT'),
  PAGINATION_DEFAULT_LIMIT: getEnvValue('PAGINATION_DEFAULT_LIMIT'),
  PAGINATION_MAX_LIMIT: getEnvValue('PAGINATION_MAX_LIMIT'),
  SWAGGER_ENABLED: getEnvValue('SWAGGER_ENABLED'),
  SWAGGER_PATH: getEnvValue('SWAGGER_PATH'),
};

if (Number.isNaN(env.PORT)) {
  throw new Error('Variável de ambiente "PORT" deve ser um número válido.');
}

export { env };
