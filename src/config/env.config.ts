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
  ENVOIREMENT: getEnvEnum('ENVOIREMENT', environmentValues, 'development'),
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
};

if (Number.isNaN(env.PORT)) {
  throw new Error('Variável de ambiente "PORT" deve ser um número válido.');
}

export { env };
