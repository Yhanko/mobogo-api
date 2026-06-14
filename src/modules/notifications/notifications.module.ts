import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { NotificationsProcessor } from '@/modules/notifications/notification.processor';
import { QUEUE_NAMES } from '@/infra/queue/queue.module';

@Module({
  imports: [BullModule.registerQueue({ name: QUEUE_NAMES.NOTIFICATIONS })],
  providers: [NotificationsService, NotificationsProcessor],
  exports: [NotificationsService],
})
export class NotificationsModule {}
