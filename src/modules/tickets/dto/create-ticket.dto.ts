import { IsUUID, IsOptional, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'UUID do passageiro que utilizará a passagem',
  })
  @IsUUID()
  passengerId: string;

  @ApiProperty({
    example: 'a2b3c4d5-e6f7-4890-abcd-123456789abc',
    description: 'UUID do motorista / táxi que realizará a corrida',
  })
  @IsUUID()
  driverId: string;

  @ApiPropertyOptional({
    example: 150.0,
    default: 150.0,
    description: 'Valor da passagem em Kwanzas (AOA). Se omitido, usa o valor padrão do sistema.',
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount?: number;
}
