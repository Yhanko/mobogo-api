import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PayTicketDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID da passagem pendente a ser liquidada através do saldo da carteira',
  })
  @IsUUID()
  ticketId: string;
}
