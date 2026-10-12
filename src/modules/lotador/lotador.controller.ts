import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RbacGuard } from '@/common/guards/rbac.guard';
import { RequirePermission } from '@/common/decorators/require-permission.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Permission } from '@/common/types/permission.enum';
import { JwtPayload } from '@/common/types/jwt-payload.type';
import { ThrottleMedium } from '@/common/decorators/throttler.decorator';
import { LotadorService } from '@/modules/lotador/lotador.service';
import { ConfirmBoardingDto } from '@/modules/lotador/dto/confirmboarding.dto';
import { AddPartnerDto } from '@/modules/lotador/dto/addpatner.dto';

@ApiTags('lotador')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('lotador')
export class LotadorController {
  constructor(private readonly lotadorService: LotadorService) {}

  /**
   * GET /lotador/drivers
   * Lista táxis parceiros com estado online/offline e localização.
   */
  @Get('drivers')
  @ThrottleMedium()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  @ApiOperation({ summary: 'Listar motoristas parceiros do lotador' })
  @ApiResponse({ status: 200, description: 'Lista de motoristas parceiros com status online e localização' })
  getAvailableDrivers(@CurrentUser() user: JwtPayload) {
    return this.lotadorService.getAvailableDrivers(user.sub);
  }

  /**
   * GET /lotador/drivers/all
   * Lista todos os táxis activos no sistema (não apenas parceiros).
   */
  @Get('drivers/all')
  @ThrottleMedium()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  @ApiOperation({ summary: 'Listar todos os táxis ativos no sistema (geral)' })
  @ApiResponse({ status: 200, description: 'Lista de todos os motoristas ativos' })
  getAllActiveDrivers() {
    return this.lotadorService.getAllActiveDrivers();
  }

  /**
   * POST /lotador/boarding
   * Confirma embarque de passageiro por QR, short code ou referência.
   */
  @Post('boarding')
  @HttpCode(HttpStatus.OK)
  @ThrottleMedium()
  @RequirePermission(Permission.TICKET_SCAN)
  @ApiOperation({ summary: 'Confirmar embarque de passageiro no táxi' })
  @ApiResponse({ status: 200, description: 'Embarque confirmado com sucesso' })
  @ApiResponse({ status: 400, description: 'Bilhete inválido ou motorista não disponível' })
  confirmBoarding(
    @CurrentUser() user: JwtPayload,
    @Body() dto: ConfirmBoardingDto,
  ) {
    return this.lotadorService.confirmBoarding(user.sub, dto);
  }

  /**
   * GET /lotador/drivers/:driverId/reference
   * Ver código de referência da parceria com um taxista.
   */
  @Get('drivers/:driverId/reference')
  @ThrottleMedium()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  @ApiOperation({ summary: 'Obter código de referência de parceria com motorista' })
  @ApiResponse({ status: 200, description: 'Código de referência da parceria' })
  @ApiResponse({ status: 404, description: 'Parceria não encontrada' })
  getDriverReference(
    @Param('driverId', ParseUUIDPipe) driverId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.lotadorService.getDriverReference(driverId, user.sub);
  }

  /**
   * GET /lotador/partners
   * Lista todos os parceiros (activos e inactivos).
   */
  @Get('partners')
  @ThrottleMedium()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  @ApiOperation({ summary: 'Listar todas as parcerias cadastradas do lotador' })
  @ApiResponse({ status: 200, description: 'Lista de parcerias' })
  listPartners(@CurrentUser() user: JwtPayload) {
    return this.lotadorService.listPartners(user.sub);
  }

  /**
   * POST /lotador/partners
   * Adiciona um taxista como parceiro.
   */
  @Post('partners')
  @ThrottleMedium()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  @ApiOperation({ summary: 'Adicionar motorista como parceiro' })
  @ApiResponse({ status: 201, description: 'Parceria criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Motorista já associado ou inválido' })
  addPartner(@CurrentUser() user: JwtPayload, @Body() dto: AddPartnerDto) {
    return this.lotadorService.addPartner(user.sub, dto);
  }

  /**
   * DELETE /lotador/partners/:driverId
   * Remove (desactiva) parceria com um taxista.
   */
  @Delete('partners/:driverId')
  @HttpCode(HttpStatus.OK)
  @ThrottleMedium()
  @RequirePermission(Permission.LOCATION_VIEW_ALL)
  @ApiOperation({ summary: 'Remover / desativar parceria com motorista' })
  @ApiResponse({ status: 200, description: 'Parceria desativada com sucesso' })
  @ApiResponse({ status: 404, description: 'Parceria não encontrada' })
  removePartner(
    @Param('driverId', ParseUUIDPipe) driverId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.lotadorService.removePartner(user.sub, driverId);
  }
}

