import { IsUUID, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class CreateTicketDto {
  @IsUUID()
  passengerId: string;

  @IsUUID()
  driverId: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount?: number;
}
