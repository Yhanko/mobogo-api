import { IsString, MinLength, MaxLength } from 'class-validator';

export class CancelTicketDto {
  @IsString()
  @MinLength(5, { message: 'Motivo deve ter pelo menos 5 caracteres' })
  @MaxLength(255, { message: 'Motivo demasiado longo' })
  reason: string;
}
