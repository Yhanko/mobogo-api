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
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Permission } from '../../common/types/permission.enum';
import { JwtPayload } from '../../common/types/jwt-payload.type';
import { LotadorService } from './lotador.service';
import { ConfirmBoardingDto } from './dto/confirm-boarding.dto';
import { AddPartnerDto } from './dto/add-partner.dto';

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
  removePartner(
    @Param('driverId', ParseUUIDPipe) driverId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.lotadorService.removePartner(user.sub, driverId);
  }
}
