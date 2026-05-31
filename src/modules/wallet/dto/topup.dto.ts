import {
  IsNumber,
  IsPositive,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class TopupDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Valor deve ser positivo' })
  amount: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  reference?: string; // referência de pagamento externo (Multicaixa, etc.)
}
