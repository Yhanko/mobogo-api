import { IsUUID } from 'class-validator';

export class AddPartnerDto {
  @IsUUID()
  driverId: string;
}
