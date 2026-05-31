import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportingController } from './reporting.controller';
import { ReportingService } from './reporting.service';
import { DailyReportJob } from './jobs/daily-report.job';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    ScheduleModule.forRoot(), // activa o @Cron decorator
    NotificationsModule,
  ],
  controllers: [ReportingController],
  providers: [ReportingService, DailyReportJob, PrismaService],
  exports: [ReportingService],
})
export class ReportingModule {}
