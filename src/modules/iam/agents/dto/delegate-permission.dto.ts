import { IsArray, IsEnum, ArrayMinSize } from 'class-validator';
import { Permission } from '@/common/types/permission.enum';
import { ApiProperty } from '@nestjs/swagger';

export class DelegatePermissionsDto {
  @ApiProperty({
    isArray: true,
    enum: Permission,
    example: [Permission.TICKET_CREATE, Permission.TICKET_SCAN],
    description: 'Lista completa de permissões que substituirão as atuais do agente',
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Forneça pelo menos uma permissão' })
  @IsEnum(Permission, { each: true, message: 'Permissão inválida' })
  permissions: Permission[];
}
