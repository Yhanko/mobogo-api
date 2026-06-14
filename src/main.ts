import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import helmet from 'helmet';
import { AppModule } from './bootstrap/app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { env } from './config/env.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    // Logs estruturados — em produção usa 'error' | 'warn' apenas
    logger:
      env.ENVIRONMENT === 'production'
        ? ['error', 'warn']
        : ['log', 'debug', 'error', 'warn', 'verbose'],
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('app.port', 8000);
  const isDev = config.get<boolean>('app.isDev', true);

  // ── Segurança ─────────────────────────────────────────────────────────────
  app.use(helmet()); // headers de segurança HTTP (XSS, clickjacking, etc.)

  // ── CORS ──────────────────────────────────────────────────────────────────
  const origins = config.get<string[]>('app.cors.origins', [
    env.API_ORIGINS,
  ]);
  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ── Versionamento da API ──────────────────────────────────────────────────
  // Todos os endpoints ficam em /v1/...
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // ── Prefixo global ────────────────────────────────────────────────────────
  app.setGlobalPrefix('api');
  // Resultado: /api/v1/auth/login, /api/v1/tickets, etc.

  // ── Validação global de DTOs ──────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos não declarados no DTO
      forbidNonWhitelisted: true, // lança erro se campos extra chegarem
      transform: true, // converte tipos automaticamente (string→number)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ── Filtro global de excepções ────────────────────────────────────────────
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ── WebSocket (Socket.io) ─────────────────────────────────────────────────
  app.useWebSocketAdapter(new IoAdapter(app));

  // ── Swagger — apenas fora de produção ────────────────────────────────────
  const swaggerEnabled = config.get<boolean>('app.swagger.enabled', isDev);
  if (swaggerEnabled) {
    const swaggerPath = config.get<string>('app.swagger.path', 'docs');

    const swaggerConfig = new DocumentBuilder()
      .setTitle(config.get<string>('app.swagger.title', 'Taxi API'))
      .setDescription(config.get<string>('app.swagger.description', ''))
      .setVersion(config.get<string>('app.version', '1.0.0'))
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          in: 'header',
        },
        'access-token',
      )
      .addTag('auth', 'Autenticação e tokens')
      .addTag('tickets', 'Emissão e validação de passagens')
      .addTag('wallet', 'Carteira digital')
      .addTag('rides', 'Histórico de corridas')
      .addTag('location', 'Localização em tempo real')
      .addTag('notifications', 'Notificações')
      .addTag('reporting', 'Relatórios e exportação')
      .addTag('lotador', 'Gestão de lotadores')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(swaggerPath, app, document, {
      swaggerOptions: {
        persistAuthorization: true, // mantém o token entre reloads do Swagger UI
      },
    });

    logger.log(
      `Swagger disponível em: http://localhost:${port}/${swaggerPath}`,
    );
  }

  // ── Graceful shutdown ─────────────────────────────────────────────────────
  // Necessário para o Prisma e Redis desconectarem correctamente ao parar
  app.enableShutdownHooks();

  await app.listen(port);

  logger.log(`🚕 Mobogo API a correr em: http://localhost:${port}/api/v1`);
  logger.log(`   Ambiente: ${config.get('app.env')}`);
}

bootstrap().catch((err) => {
  new Logger('Bootstrap').error('Falha ao iniciar a aplicação', err);
  process.exit(1);
});
