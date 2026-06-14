import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RbacGuard } from '@/common/guards/rbac.guard';
import { RequirePermission } from '@/common/decorators/require-permission.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Permission } from '@/common/types/permission.enum';
import { type JwtPayload } from '@/common/types/jwt-payload.type';
import { ThrottleLoose } from '@/common/decorators/throttler.decorator';
import { WalletService } from './wallet.service';
import { TopupDto } from './dto/topup.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { PayTicketDto } from './dto/pay-ticket.dto';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  /**
   * GET /wallet/balance
   * Ver saldo em tempo real.
   */
  @Get('balance')
  @ThrottleLoose()
  @RequirePermission(Permission.WALLET_VIEW)
  getBalance(@CurrentUser() user: JwtPayload) {
    return this.walletService.getBalance(user.sub);
  }

  /**
   * POST /wallet/topup
   * Recarregar carteira.
   */
  @Post('topup')
  @ThrottleLoose()
  @RequirePermission(Permission.WALLET_TOPUP)
  topup(@CurrentUser() user: JwtPayload, @Body() dto: TopupDto) {
    return this.walletService.topup(user.sub, dto);
  }

  /**
   * POST /wallet/withdraw
   * Levantar dinheiro.
   */
  @Post('withdraw')
  @ThrottleLoose()
  @RequirePermission(Permission.WALLET_WITHDRAW)
  withdraw(@CurrentUser() user: JwtPayload, @Body() dto: WithdrawDto) {
    return this.walletService.withdraw(user.sub, dto);
  }

  /**
   * POST /wallet/pay
   * Passageiro paga ticket via carteira digital.
   * Debita passageiro e credita taxista atomicamente.
   */
  @Post('pay')
  @ThrottleLoose()
  @RequirePermission(Permission.WALLET_TOPUP)
  payTicket(@CurrentUser() user: JwtPayload, @Body() dto: PayTicketDto) {
    return this.walletService.payTicket(user.sub, dto);
  }

  /**
   * GET /wallet/history
   * Histórico de movimentações do próprio utilizador.
   */
  @Get('history')
  @ThrottleLoose()
  @RequirePermission(Permission.WALLET_VIEW)
  getHistory(
    @CurrentUser() user: JwtPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.walletService.getHistory(user.sub, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  /**
   * GET /wallet/driver/:driverId/monthly
   * Cliente vê o resumo mensal de um taxista seu.
   */
  @Get('driver/:driverId/monthly')
  @ThrottleLoose()
  @RequirePermission(Permission.REPORT_VIEW_ALL)
  getDriverMonthly(@Param('driverId', ParseUUIDPipe) driverId: string) {
    return this.walletService.getDriverMonthlyBalance(driverId);
  }
}
