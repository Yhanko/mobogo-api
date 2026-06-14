import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportingController } from '@/modules/reporting/reporting.controller';
import { ReportingService } from '@/modules/reporting/reporting.service';
import { DailyReportJob } from '@/modules/reporting/jobs/daily-report.job';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { NotificationsModule } from '@/modules/notifications/notifications.module';

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
