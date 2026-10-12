import {
  IsNumber,
  IsPositive,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WithdrawDto {
  @ApiProperty({
    example: 500.0,
    description: 'Valor monetário a levantar da carteira em Kwanzas (AOA)',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Valor deve ser positivo' })
  amount: number;

  @ApiPropertyOptional({
    example: 'LEV-20261012-12345',
    description: 'Referência do levantamento externo ou recibo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  reference?: string;
}
