import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RbacGuard } from '@/common/guards/rbac.guard';
import { RequirePermission } from '@/common/decorators/require-permission.decorator';
import { Permission } from '@/common/types/permission.enum';
import { ThrottleLoose } from '@/common/decorators/throttler.decorator';
import { LocationService } from '@/modules/location/location.service';

@ApiTags('location')
@ApiBearerAuth('access-token')
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
  @ApiOperation({ summary: 'Obter todos os motoristas/táxis ativos no mapa' })
  @ApiResponse({ status: 200, description: 'Lista de motoristas ativos e coordenadas' })
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
  @ApiOperation({ summary: 'Obter passageiros ativos no mapa' })
  @ApiResponse({ status: 200, description: 'Lista de passageiros ativos' })
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
  @ApiOperation({ summary: 'Obter posição geográfica atual de um motorista específico' })
  @ApiResponse({ status: 200, description: 'Última localização do motorista' })
  @ApiResponse({ status: 404, description: 'Localização ou motorista não encontrado' })
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
  @ApiOperation({ summary: 'Obter posição geográfica atual de um passageiro específico' })
  @ApiResponse({ status: 200, description: 'Última localização do passageiro' })
  @ApiResponse({ status: 404, description: 'Passageiro não encontrado' })
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
  @ApiOperation({ summary: 'Histórico de percurso/posições de um motorista' })
  @ApiResponse({ status: 200, description: 'Histórico de coordenadas por intervalo de tempo' })
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
  @ApiOperation({ summary: 'Histórico de posições de qualquer utilizador (auditoria)' })
  @ApiResponse({ status: 200, description: 'Histórico de coordenadas do utilizador' })
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

