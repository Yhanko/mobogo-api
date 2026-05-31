import { IsUUID } from 'class-validator';

export class PayTicketDto {
  @IsUUID()
  ticketId: string;
}
