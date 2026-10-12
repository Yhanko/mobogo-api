import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddPartnerDto {
  @ApiProperty({
    example: 'a2b3c4d5-e6f7-4890-abcd-123456789abc',
    description: 'UUID do motorista a ser associado como parceiro do lotador',
  })
  @IsUUID()
  driverId: string;
}
