import { IsString, IsOptional, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TransferTicketDto {
  @ApiPropertyOptional({
    example: '+244923445566',
    description: 'Telefone do passageiro destinatário da transferência',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+\d{9,15}$/, { message: 'Telefone inválido' })
  toPhone?: string;

  @ApiPropertyOptional({
    example: 'TAX-12345678',
    description: 'Display ID do passageiro destinatário (para quem não tem telefone)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^TAX-[A-F0-9]{8}$/, { message: 'Display ID inválido' })
  toDisplayId?: string;
}
