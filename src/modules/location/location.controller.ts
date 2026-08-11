import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RbacGuard } from '@/common/guards/rbac.guard';
import { RequirePermission } from '@/common/decorators/require-permission.decorator';
import { Permission } from '@/common/types/permission.enum';
import { ThrottleLoose } from '@/common/decorators/throttler.decorator';
import { LocationService } from '@/modules/location/location.service';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /**
   * GET /location/drivers/active
   * Admin, lotador e agente vêem todos os táxis activos no mapa.
   */
  @Get('drivers/active')
  @ThrottleLoose()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  getActiveDrivers() {
    return this.locationService.getActiveDrivers();
  }

  /**
   * GET /location/passengers/active
   * Admin e agente vêem todos os passageiros activos no mapa.
   */
  @Get('passengers/active')
  @ThrottleLoose()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  getActivePassengers() {
    return this.locationService.getActivePassengers();
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
   * GET /location/passengers/:passengerId
   * Posição actual de um passageiro específico.
   */
  @Get('passengers/:passengerId')
  @ThrottleLoose()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  getPassengerLocation(
    @Param('passengerId', ParseUUIDPipe) passengerId: string,
  ) {
    return this.locationService.getPassengerLocation(passengerId);
  }

  /**
   * GET /location/drivers/:driverId/history
   * Histórico de posições de um taxista específico — para relatórios e auditoria.
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

  /**
   * GET /location/users/:userId/history
   * Histórico de posições de qualquer utilizador (passageiro ou motorista) para auditoria.
   */
  @Get('users/:userId/history')
  @ThrottleLoose()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  getUserHistory(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('limit') limit?: string,
  ) {
    return this.locationService.getUserLocationHistory(
      userId,
      new Date(from),
      new Date(to),
      limit ? parseInt(limit, 10) : 500,
    );
  }
}
