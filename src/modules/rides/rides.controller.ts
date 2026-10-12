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
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Permission } from '@/common/types/permission.enum';
import { type JwtPayload } from '@/common/types/jwt-payload.type';
import { RidesService } from '@/modules/rides/rides.service';
import { RidesFilterDto } from '@/modules/rides/dto/rides.dto';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('rides')
@ApiBearerAuth('access-token')
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
  @ApiOperation({ summary: 'Listar todas as corridas com filtros (Admin)' })
  @ApiResponse({ status: 200, description: 'Lista paginada de corridas' })
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
  @ApiOperation({ summary: 'Obter detalhe de uma corrida específica' })
  @ApiResponse({ status: 200, description: 'Detalhes da corrida' })
  @ApiResponse({ status: 404, description: 'Corrida não encontrada' })
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
  @ApiOperation({ summary: 'Histórico de corridas de um passageiro específico' })
  @ApiResponse({ status: 200, description: 'Lista paginada de corridas do passageiro' })
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
  @ApiOperation({ summary: 'Histórico de corridas de um motorista específico' })
  @ApiResponse({ status: 200, description: 'Lista paginada de corridas do motorista' })
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
  @ApiOperation({ summary: 'Sumário diário de corridas de um motorista' })
  @ApiResponse({ status: 200, description: 'Estatísticas diárias do motorista' })
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
  @ApiOperation({ summary: 'Sumário mensal de corridas de um motorista' })
  @ApiResponse({ status: 200, description: 'Estatísticas mensais do motorista' })
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
  @ApiOperation({ summary: 'Pesquisar passageiro por telefone ou displayId' })
  @ApiResponse({ status: 200, description: 'Passageiro encontrado ou null' })
  searchPassenger(@Query('q') query: string) {
    return this.ridesService.findPassenger(query);
  }
}

