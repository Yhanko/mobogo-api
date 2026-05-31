import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { RedisService } from '../../../infrastructure/redis/redis.service';

@Module({
  controllers: [AgentsController],
  providers: [AgentsService, PrismaService, RedisService],
  exports: [AgentsService],
})
export class AgentsModule {}
