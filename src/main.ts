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
  const port = config.get<number>('app.port', env.PORT);
  const isDev = config.get<boolean>(
    'app.isDev',
    env.ENVIRONMENT === 'development',
  );

  // ── Segurança ─────────────────────────────────────────────────────────────
  app.use(
    helmet({
      contentSecurityPolicy: false, // Permite carregar o Swagger UI sem tela em branco por bloqueio de CSP
    }),
  );

  // ── CORS ──────────────────────────────────────────────────────────────────
  // Aceita todas as origens (origin: true reflete a origem da requisição, compatível com credentials: true)
  app.enableCors({
    origin: true,
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

  // ── Swagger — disponível quando SWAGGER_ENABLED=true ou em dev/staging ────
  const showSwagger =
    env.SWAGGER_ENABLED === 'true' ||
    env.ENVIRONMENT === 'development' ||
    env.ENVIRONMENT === 'staging';
  const swaggerEnabled = config.get<boolean>('app.swagger.enabled', showSwagger);
  if (swaggerEnabled) {
    const swaggerPath = config.get<string>('app.swagger.path', 'docs');

    const swaggerDescription =
      `${config.get<string>('app.swagger.description', 'Documentação e testes da API Mobogo.')}\n\n` +
      `---\n\n` +
      `### 📥 Exportar para Postman / OpenAPI JSON\n\n` +
      `Para importar toda a documentação no Postman ou ver o JSON bruto:\n\n` +
      `[📥 Abrir Documentação em JSON (/${swaggerPath}-json)](/${swaggerPath}-json)\n\n` +
      `*Dica: Você pode clicar no botão acima para abrir e copiar o JSON, ou colar a URL diretamente no botão **Import** do Postman.*`;

    const swaggerConfig = new DocumentBuilder()
      .setTitle(config.get<string>('app.swagger.title', 'Mobogo API'))
      .setDescription(swaggerDescription)
      .setVersion(config.get<string>('app.version', '1.0.0'))
      .addServer('/', 'Servidor Atual')
      .addServer(`http://localhost:${port}`, 'Ambiente Local')
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
      .addSecurityRequirements('access-token')
      .addTag('auth', 'Autenticação e tokens')
      .addTag('tickets', 'Emissão e validação de passagens')
      .addTag('wallet', 'Carteira digital')
      .addTag('rides', 'Histórico de corridas')
      .addTag('location', 'Localização em tempo real')
      .addTag('notifications', 'Notificações')
      .addTag('reporting', 'Relatórios e exportação')
      .addTag('lotador', 'Gestão de lotadores')
      .addTag('health', 'Verificação de integridade da API')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(swaggerPath, app, document, {
      customSiteTitle: 'Mobogo API Docs',
      customCss: `
        .swagger-ui .info .description a {
          display: inline-flex;
          align-items: center;
          background-color: #2563eb;
          color: #ffffff !important;
          padding: 9px 18px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          box-shadow: 0 2px 5px rgba(37, 99, 235, 0.3);
          transition: background-color 0.2s;
        }
        .swagger-ui .info .description a:hover {
          background-color: #1d4ed8;
          text-decoration: none;
        }
      `,
      swaggerOptions: {
        persistAuthorization: true, // mantém o token entre reloads do Swagger UI
        tryItOutEnabled: true, // deixa todos os endpoints prontos para testar ("Try it out" ativo)
        displayRequestDuration: true, // exibe o tempo de resposta da API em ms
        filter: true, // barra de pesquisa rápida para filtrar endpoints
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

// Trigger restart

// Trigger restart 2
