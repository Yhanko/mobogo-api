import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

// ── Configs ───────────────────────────────────────────────────────────────────
import appConfig from '@/config/app.config';
import databaseConfig from '@/config/database.config';
import redisConfig from '@/config/redis.config';
import jwtConfig from '@/config/jwt.config';

// ── Infra ─────────────────────────────────────────────────────────────────────
import { QueueModule } from '@/infra/queue/queue.module';
import { PrismaModule } from '@/infra/prisma/prisma.module';
import { RedisModule } from '@/infra/redis/redis.module';

// ── Common ────────────────────────────────────────────────────────────────────
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RbacGuard } from '@/common/guards/rbac.guard';
import { CustomThrottlerGuard } from '@/common/guards/throttler.guard';
import { AuditLogInterceptor } from '@/common/interceptors/audit-log.interceptor';
import { ResponseTransformInterceptor } from '@/common/interceptors/response-transform.interceptor';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';

// ── IAM ───────────────────────────────────────────────────────────────────────
import { UsersModule } from '@/modules/iam/users/users.module';
import { AgentsModule } from '@/modules/iam/agents/agents.module';
import { DriversModule } from '@/modules/iam/drivers/driver.module';

// ── Domínios ──────────────────────────────────────────────────────────────────
import { AuthModule } from '@/modules/auth/auth.module';
import { TicketsModule } from '@/modules/tickets/tickets.module';
import { WalletModule } from '@/modules/wallet/wallet.module';
import { RidesModule } from '@/modules/rides/rides.module';
import { LocationModule } from '@/modules/location/location.module';
import { NotificationsModule } from '@/modules/notifications/notifications.module';
import { ReportingModule } from '@/modules/reporting/reporting.module';
import { LotadorModule } from '@/modules/lotador/lotador.module';

@Module({
  imports: [
    // ── Configuração global ───────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [appConfig, databaseConfig, redisConfig, jwtConfig],
    }),

    // ── Rate limiting global ──────────────────────────────────────────────
    // Lê os limites do app.config para não duplicar configuração
    // Múltiplos throttlers nomeados — cada um pode ser usado selectivamente
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            // "default" — aplicado globalmente a todos os endpoints
            name: 'default',
            ttl: config.get<number>('RATE_LIMIT_WINDOW_MS', 60_000),
            limit: config.get<number>('RATE_LIMIT_MAX', 60),
          },
          {
            // "strict" — para endpoints sensíveis (login, OTP)
            // Activado com @ThrottleStrict() no controller
            name: 'strict',
            ttl: 60_000,
            limit: 5,
          },
          {
            // "loose" — para leitura frequente (GPS, saldo)
            name: 'loose',
            ttl: 60_000,
            limit: 300,
          },
        ],
      }),
    }),

    // ── Infra ─────────────────────────────────────────────────────────────
    QueueModule,
    PrismaModule,
    RedisModule,

    // ── IAM ───────────────────────────────────────────────────────────────
    UsersModule,
    AgentsModule,
    DriversModule,

    // ── Auth ──────────────────────────────────────────────────────────────
    AuthModule,

    // ── Domínios ──────────────────────────────────────────────────────────
    NotificationsModule,
    TicketsModule,
    WalletModule,
    RidesModule,
    LocationModule,
    ReportingModule,
    LotadorModule,
  ],

  providers: [
    // ── Filtro global ─────────────────────────────────────────────────────
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },

    // ── Guards globais — ordem importa ────────────────────────────────────
    // 1. Throttler — bloqueia antes de qualquer lógica de negócio
    // 2. JWT       — autentica o utilizador
    // 3. RBAC      — autoriza com base nas permissões
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RbacGuard,
    },

    // ── Interceptors globais ──────────────────────────────────────────────
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
  ],
})
export class AppModule {}
