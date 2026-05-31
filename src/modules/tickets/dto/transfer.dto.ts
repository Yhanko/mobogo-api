import { IsString, IsOptional, Matches } from 'class-validator';

export class TransferTicketDto {
  @IsOptional()
  @IsString()
  @Matches(/^\+\d{9,15}$/, { message: 'Telefone inválido' })
  toPhone?: string;

  @IsOptional()
  @IsString()
  @Matches(/^TAX-[A-F0-9]{8}$/, { message: 'Display ID inválido' })
  toDisplayId?: string;
}
