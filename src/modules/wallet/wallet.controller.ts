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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
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

@ApiTags('wallet')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  /**
   * GET /wallet/transactions
   * Admin: Lista global de transacções do sistema
   */
  @Get('transactions')
  @ThrottleLoose()
  @RequirePermission(Permission.WALLET_VIEW)
  @ApiOperation({ summary: 'Listar todas as transações do sistema (Admin)' })
  @ApiResponse({ status: 200, description: 'Lista paginada de transações' })
  getAllTransactions(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.walletService.findAllTransactions({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  /**
   * GET /wallet/all
   * Admin: Lista global de carteiras e saldos
   */
  @Get('all')
  @ThrottleLoose()
  @RequirePermission(Permission.WALLET_VIEW)
  @ApiOperation({ summary: 'Listar todas as carteiras e saldos (Admin)' })
  @ApiResponse({ status: 200, description: 'Lista paginada de carteiras' })
  getAllWallets(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.walletService.findAllWallets({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  /**
   * POST /wallet/admin/:userId/topup
   * Admin: Recarregar carteira de um utilizador específico.
   */
  @Post('admin/:userId/topup')
  @ThrottleLoose()
  @RequirePermission(Permission.WALLET_TOPUP)
  @ApiOperation({ summary: 'Recarregar carteira de utilizador específico (Admin)' })
  @ApiResponse({ status: 200, description: 'Carteira recarregada com sucesso' })
  @ApiResponse({ status: 400, description: 'Valor ou utilizador inválido' })
  adminTopup(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: TopupDto,
  ) {
    return this.walletService.topup(userId, dto);
  }

  /**
   * POST /wallet/admin/:userId/withdraw
   * Admin: Levantar dinheiro da carteira de um utilizador específico.
   */
  @Post('admin/:userId/withdraw')
  @ThrottleLoose()
  @RequirePermission(Permission.WALLET_WITHDRAW)
  @ApiOperation({ summary: 'Levantar saldo da carteira de utilizador (Admin)' })
  @ApiResponse({ status: 200, description: 'Levantamento efetuado com sucesso' })
  @ApiResponse({ status: 400, description: 'Saldo insuficiente ou valor inválido' })
  adminWithdraw(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: WithdrawDto,
  ) {
    return this.walletService.withdraw(userId, dto);
  }

  /**
   * GET /wallet/balance
   * Ver saldo em tempo real.
   */
  @Get('balance')
  @ThrottleLoose()
  @RequirePermission(Permission.WALLET_VIEW)
  @ApiOperation({ summary: 'Ver saldo em tempo real da carteira do utilizador logado' })
  @ApiResponse({
    status: 200,
    description: 'Saldo atual da carteira',
    schema: {
      example: {
        balance: 5000,
        currency: 'AOA',
        lastUpdated: '2026-10-12T12:00:00.000Z',
      },
    },
  })
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
  @ApiOperation({ summary: 'Recarregar carteira do próprio utilizador' })
  @ApiResponse({
    status: 200,
    description: 'Carteira recarregada com sucesso',
    schema: {
      example: {
        success: true,
        message: 'Carteira recarregada com sucesso',
        newBalance: 7000,
        transactionId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Valor inválido',
    schema: {
      example: {
        statusCode: 400,
        message: 'O valor da recarga deve ser superior a 0',
        error: 'Bad Request',
      },
    },
  })
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
  @ApiOperation({ summary: 'Levantar saldo da própria carteira' })
  @ApiResponse({
    status: 200,
    description: 'Levantamento efetuado com sucesso',
    schema: {
      example: {
        success: true,
        message: 'Levantamento efetuado com sucesso',
        newBalance: 3000,
        transactionId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Saldo insuficiente ou valor inválido',
    schema: {
      example: {
        statusCode: 400,
        message: 'Saldo insuficiente na carteira',
        error: 'Bad Request',
      },
    },
  })
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
  @ApiOperation({ summary: 'Pagar bilhete via saldo da carteira digital' })
  @ApiResponse({
    status: 200,
    description: 'Pagamento processado com sucesso',
    schema: {
      example: {
        success: true,
        message: 'Pagamento efetuado com sucesso',
        newBalance: 4850,
        ticketId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Saldo insuficiente ou bilhete já pago',
    schema: {
      example: {
        statusCode: 400,
        message: 'Saldo insuficiente para pagar o bilhete',
        error: 'Bad Request',
      },
    },
  })
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
  @ApiOperation({ summary: 'Histórico de movimentações da própria carteira' })
  @ApiResponse({ status: 200, description: 'Extrato/histórico de transações' })
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
  @ApiOperation({ summary: 'Resumo mensal financeiro de um motorista específico' })
  @ApiResponse({ status: 200, description: 'Resumo mensal de ganhos e corridas' })
  getDriverMonthly(@Param('driverId', ParseUUIDPipe) driverId: string) {
    return this.walletService.getDriverMonthlyBalance(driverId);
  }
}

