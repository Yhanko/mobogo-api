import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Permission } from '../../common/types/permission.enum';
import { JwtPayload } from '../../common/types/jwt-payload.type';
import { RidesService } from './rides.service';
import { RidesFilterDto } from './dto/rides.dto';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  /**
   * GET /rides
   * Admin vê todas as corridas com filtros opcionais.
   */
  @Get()
  @SkipThrottle()
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  findAll(
    @Query() filters: RidesFilterDto,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.ridesService.findAll(filters, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  /**
   * GET /rides/:id
   * Detalhe de uma corrida específica.
   */
  @Get(':id')
  @SkipThrottle()
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.ridesService.findOne(id, user);
  }

  /**
   * GET /rides/passenger/:passengerId
   * Histórico de corridas de um passageiro.
   * Passageiro só acede ao seu próprio histórico.
   */
  @Get('passenger/:passengerId')
  @SkipThrottle()
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  findByPassenger(
    @Param('passengerId', ParseUUIDPipe) passengerId: string,
    @Query() filters: RidesFilterDto,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @CurrentUser() user?: JwtPayload,
  ) {
    return this.ridesService.findByPassenger(
      passengerId,
      filters,
      {
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
      },
      user!,
    );
  }

  /**
   * GET /rides/driver/:driverId
   * Histórico de corridas de um taxista.
   * Taxista só acede ao seu próprio histórico.
   */
  @Get('driver/:driverId')
  @SkipThrottle()
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  findByDriver(
    @Param('driverId', ParseUUIDPipe) driverId: string,
    @Query() filters: RidesFilterDto,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @CurrentUser() user?: JwtPayload,
  ) {
    return this.ridesService.findByDriver(
      driverId,
      filters,
      {
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
      },
      user!,
    );
  }

  /**
   * GET /rides/driver/:driverId/summary/daily
   * Sumário diário do taxista — usado pelo agente e pelo próprio taxista.
   */
  @Get('driver/:driverId/summary/daily')
  @SkipThrottle()
  @RequirePermission(Permission.REPORT_VIEW_OWN)
  getDailySummary(
    @Param('driverId', ParseUUIDPipe) driverId: string,
    @Query('date') date?: string,
  ) {
    return this.ridesService.getDailyDriverSummary(driverId, date);
  }

  /**
   * GET /rides/driver/:driverId/summary/monthly
   * Sumário mensal do taxista.
   */
  @Get('driver/:driverId/summary/monthly')
  @SkipThrottle()
  @RequirePermission(Permission.REPORT_VIEW_OWN)
  getMonthlySummary(
    @Param('driverId', ParseUUIDPipe) driverId: string,
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    return this.ridesService.getMonthlyDriverSummary(
      driverId,
      year ? parseInt(year, 10) : undefined,
      month ? parseInt(month, 10) : undefined,
    );
  }

  /**
   * GET /rides/passenger/search
   * Taxista pesquisa passageiro por telefone ou displayId.
   */
  @Get('passenger/search')
  @SkipThrottle()
  @RequirePermission(Permission.TICKET_SCAN)
  searchPassenger(@Query('q') query: string) {
    return this.ridesService.findPassenger(query);
  }
}
