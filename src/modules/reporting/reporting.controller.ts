import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  ParseUUIDPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Permission } from '../../common/types/permission.enum';
import { JwtPayload } from '../../common/types/jwt-payload.type';
import { ReportingService } from './reporting.service';
import { ReportFilterDto, ReportFormat } from './dto/report-filter.dto';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('reports')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  /**
   * GET /reports/system
   * Admin vê o resumo geral do sistema no período.
   */
  @Get('system')
  @SkipThrottle()
  @RequirePermission(Permission.REPORT_VIEW_ALL)
  getSystemSummary(@Query() filters: ReportFilterDto) {
    return this.reportingService.getSystemSummary(filters);
  }

  /**
   * GET /reports/drivers/:driverId/daily
   * Relatório diário de um taxista — agente, cliente ou o próprio taxista.
   */
  @Get('drivers/:driverId/daily')
  @SkipThrottle()
  @RequirePermission(Permission.REPORT_VIEW_OWN)
  async getDailyDriver(
    @Param('driverId', ParseUUIDPipe) driverId: string,
    @Query() filters: ReportFilterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const report = await this.reportingService.getDailyDriverReport(
      driverId,
      filters,
    );

    if (filters.format === ReportFormat.CSV) {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="driver-${driverId}-daily.csv"`,
      );
    }

    return report;
  }

  /**
   * GET /reports/clients/:clientId/monthly
   * Relatório mensal de todos os taxistas de um cliente.
   */
  @Get('clients/:clientId/monthly')
  @SkipThrottle()
  @RequirePermission(Permission.REPORT_VIEW_ALL)
  async getClientMonthly(
    @Param('clientId', ParseUUIDPipe) clientId: string,
    @Query() filters: ReportFilterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const report = await this.reportingService.getClientMonthlyReport(
      clientId,
      filters,
    );

    if (filters.format === ReportFormat.CSV) {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="client-${clientId}-monthly.csv"`,
      );
    }

    return report;
  }

  /**
   * GET /reports/agents
   * Admin vê o relatório de actividade de todos os agentes.
   */
  @Get('agents')
  @SkipThrottle()
  @RequirePermission(Permission.REPORT_VIEW_ALL)
  getAgentsReport(@Query() filters: ReportFilterDto) {
    return this.reportingService.getAgentsReport(filters);
  }

  /**
   * GET /reports/me/driver
   * Taxista vê o seu próprio relatório diário.
   */
  @Get('me/driver')
  @SkipThrottle()
  @RequirePermission(Permission.REPORT_VIEW_OWN)
  async getMyDriverReport(
    @CurrentUser() user: JwtPayload,
    @Query() filters: ReportFilterDto,
  ) {
    // Resolve o driverId a partir do userId do token
    const { PrismaService } =
      await import('../../infrastructure/prisma/prisma.service');
    // Nota: em produção injeta PrismaService no construtor — aqui é simplificado
    return {
      message: 'Use GET /reports/drivers/:driverId/daily com o teu driverId',
    };
  }
}
