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
import { Permission } from '../../common/types/permission.enum';
import { LocationService } from './location.service';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /**
   * GET /location/drivers/active
   * Admin e lotador vêem todos os táxis activos no mapa.
   */
  @Get('drivers/active')
  @ThrottleLoose()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  getActiveDrivers() {
    return this.locationService.getActiveDrivers();
  }

  /**
   * GET /location/drivers/:driverId
   * Posição actual de um taxista específico.
   */
  @Get('drivers/:driverId')
  @ThrottleLoose()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  getDriverLocation(@Param('driverId', ParseUUIDPipe) driverId: string) {
    return this.locationService.getDriverLocation(driverId);
  }

  /**
   * GET /location/drivers/:driverId/history
   * Histórico de posições — para relatórios e auditoria.
   */
  @Get('drivers/:driverId/history')
  @ThrottleLoose()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  getDriverHistory(
    @Param('driverId', ParseUUIDPipe) driverId: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('limit') limit?: string,
  ) {
    return this.locationService.getDriverLocationHistory(
      driverId,
      new Date(from),
      new Date(to),
      limit ? parseInt(limit, 10) : 500,
    );
  }
}
