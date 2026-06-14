import { Module } from '@nestjs/common';
import { DriversController } from '@/modules/iam/drivers/driver.controller';
import { DriversService } from '@/modules/iam/drivers/driver.service';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { RedisService } from '@/infra/redis/redis.service';
import { NotificationsModule } from '@/modules/notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [DriversController],
  providers: [DriversService, PrismaService, RedisService],
  exports: [DriversService],
})
export class DriversModule {}
