import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum BoardingMethod {
  QR = 'qr',
  SHORT_CODE = 'short_code',
  REFERENCE = 'reference',
}

export class ConfirmBoardingDto {
  @IsEnum(BoardingMethod)
  method: BoardingMethod;

  @IsString()
  @IsNotEmpty()
  value: string; // QR base64url, short code 6 dígitos, ou referência LOT-XXXX-XXXX

  @IsOptional()
  @IsString()
  notes?: string;
}
