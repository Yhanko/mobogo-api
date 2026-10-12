import {
  IsNumber,
  IsPositive,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TopupDto {
  @ApiProperty({
    example: 1000.0,
    description: 'Valor monetário da recarga em Kwanzas (AOA)',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Valor deve ser positivo' })
  amount: number;

  @ApiPropertyOptional({
    example: 'MCX-20261012-98765',
    description: 'Referência do pagamento externo (Multicaixa Express, transferência, etc.)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  reference?: string;
}
