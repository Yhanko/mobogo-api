import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { Public } from '@/common/decorators/public.decorator';
import { SkipThrottle } from '@/common/decorators/throttler.decorator';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { RedisService } from '@/infra/redis/redis.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Public()
  @SkipThrottle()
  @Get()
  @ApiOperation({ summary: 'Verificação de integridade da API e dependências' })
  @ApiResponse({ status: 200, description: 'API e serviços saudáveis' })
  @ApiResponse({ status: 503, description: 'Serviço degradado ou dependência indisponível' })
  async check(@Res() res: Response) {
    const [dbOk, redisOk] = await Promise.all([
      this.prisma.isHealthy(),
      this.redis.ping(),
    ]);

    const isHealthy = dbOk && redisOk;
    const statusCode = isHealthy ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE;

    return res.status(statusCode).json({
      status: isHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      services: {
        database: dbOk ? 'up' : 'down',
        redis: redisOk ? 'up' : 'down',
      },
    });
  }
}
