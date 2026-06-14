import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { QrService } from './qr/qr.service';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { RedisService } from '@/infra/redis/redis.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [TicketsController],
  providers: [TicketsService, QrService, PrismaService, RedisService],
  exports: [TicketsService],
})
export class TicketsModule {}
