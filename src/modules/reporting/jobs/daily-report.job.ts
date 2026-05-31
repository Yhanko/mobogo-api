import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ReportingService } from '../reporting.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { ReportPeriod, ReportFormat } from '../dto/report-filter.dto';

@Injectable()
export class DailyReportJob {
  private readonly logger = new Logger(DailyReportJob.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly reporting: ReportingService,
    private readonly notifications: NotificationsService,
  ) {}

  /**
   * Corre todos os dias às 23:55 — gera relatório do dia para cada taxista activo
   * e notifica o cliente (empresa) com o resumo.
   */
  @Cron('55 23 * * *', {
    name: 'daily-driver-reports',
    timeZone: 'Africa/Luanda',
  })
  async generateDailyDriverReports(): Promise<void> {
    this.logger.log('Job diário iniciado: a gerar relatórios dos taxistas');

    // Busca todos os taxistas que tiveram actividade hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeToday = await this.prisma.driver.findMany({
      where: {
        ticketsReceived: {
          some: { createdAt: { gte: today } },
        },
      },
      select: {
        id: true,
        clientId: true,
        user: { select: { id: true, name: true } },
      },
    });

    this.logger.log(`${activeToday.length} taxistas com actividade hoje`);

    let success = 0;
    let failed = 0;

    for (const driver of activeToday) {
      try {
        const report = await this.reporting.getDailyDriverReport(driver.id, {
          period: ReportPeriod.DAY,
          format: ReportFormat.JSON,
        });

        // Notifica o cliente (empresa) com o sumário do taxista
        if (report && typeof report === 'object' && 'summary' in report) {
          await this.notifications.notifyPaymentReceived(
            driver.clientId,
            report.summary.totalReceived,
            0, // balance não relevante aqui
            driver.user.name,
          );
        }

        success++;
      } catch (err) {
        this.logger.error(
          `Erro ao gerar relatório do taxista ${driver.id}`,
          err,
        );
        failed++;
      }
    }

    this.logger.log(
      `Job diário concluído: ${success} sucesso, ${failed} erros`,
    );
  }

  /**
   * Corre todo dia 1 às 00:05 — expira tickets PENDING do mês anterior.
   */
  @Cron('5 0 1 * *', { name: 'expire-old-tickets', timeZone: 'Africa/Luanda' })
  async expireOldTickets(): Promise<void> {
    this.logger.log('Job mensal: a expirar tickets antigos');

    const result = await this.prisma.ticket.updateMany({
      where: {
        status: 'PENDING',
        expiresAt: { lt: new Date() },
      },
      data: { status: 'EXPIRED' },
    });

    this.logger.log(`${result.count} tickets expirados`);
  }

  /**
   * Corre de hora em hora — expira tickets vencidos em tempo real.
   */
  @Cron(CronExpression.EVERY_HOUR, {
    name: 'expire-tickets-hourly',
    timeZone: 'Africa/Luanda',
  })
  async expireTicketsHourly(): Promise<void> {
    const result = await this.prisma.ticket.updateMany({
      where: {
        status: 'PENDING',
        expiresAt: { lt: new Date() },
      },
      data: { status: 'EXPIRED' },
    });

    if (result.count > 0) {
      this.logger.log(`Expiração horária: ${result.count} tickets expirados`);
    }
  }
}
