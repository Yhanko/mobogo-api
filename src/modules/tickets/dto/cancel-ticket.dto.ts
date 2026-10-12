import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CancelTicketDto {
  @ApiProperty({
    example: 'Passageiro desistiu da viagem antes do embarque',
    description: 'Motivo do cancelamento da passagem (mínimo 5 caracteres)',
  })
  @IsString()
  @MinLength(5, { message: 'Motivo deve ter pelo menos 5 caracteres' })
  @MaxLength(255, { message: 'Motivo demasiado longo' })
  reason: string;
}
