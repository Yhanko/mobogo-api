import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ScanMode {
  QR = 'qr',
  SHORT_CODE = 'short_code',
}

export class ScanTicketDto {
  @ApiProperty({
    enum: ScanMode,
    example: ScanMode.QR,
    description: 'Modo de validação: "qr" (payload do QR Code dinâmico) ou "short_code" (código de 6 dígitos)',
  })
  @IsEnum(ScanMode)
  mode: ScanMode;

  @ApiProperty({
    example: 'eyJ0aWQiOiIzZmE4NWY2NC... (ou 123456)',
    description: 'Valor do QR Code em base64url ou o código numérico de 6 dígitos',
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}
