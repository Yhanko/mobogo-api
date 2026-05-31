import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export enum ScanMode {
  QR = 'qr',
  SHORT_CODE = 'short_code',
}

export class ScanTicketDto {
  @IsEnum(ScanMode)
  mode: ScanMode;

  @IsString()
  @IsNotEmpty()
  value: string;
}
