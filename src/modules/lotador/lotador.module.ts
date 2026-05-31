import { Module } from '@nestjs/common';
import { LotadorController } from './lotador.controller';
import { LotadorService } from './lotador.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { RedisService } from '../../infrastructure/redis/redis.service';

@Module({
  controllers: [LotadorController],
  providers: [LotadorService, PrismaService, RedisService],
  exports: [LotadorService],
})
export class LotadorModule {}
