import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum BoardingMethod {
  QR = 'qr',
  SHORT_CODE = 'short_code',
  REFERENCE = 'reference',
}

export class ConfirmBoardingDto {
  @ApiProperty({
    enum: BoardingMethod,
    example: BoardingMethod.QR,
    description: 'Método de validação do embarque: "qr", "short_code" ou "reference"',
  })
  @IsEnum(BoardingMethod)
  method: BoardingMethod;

  @ApiProperty({
    example: 'eyJ0aWQiOi... (ou 123456 ou LOT-ABCD-1234)',
    description: 'Valor correspondente: QR base64url, código curto de 6 dígitos, ou código de referência',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiPropertyOptional({
    example: 'Embarque realizado na paragem de Viana',
    description: 'Notas ou observações adicionais sobre o embarque',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
