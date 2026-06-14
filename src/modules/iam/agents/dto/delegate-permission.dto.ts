import { IsArray, IsEnum, ArrayMinSize } from 'class-validator';
import { Permission } from '@/common/types/permission.enum';

export class DelegatePermissionsDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Forneça pelo menos uma permissão' })
  @IsEnum(Permission, { each: true, message: 'Permissão inválida' })
  permissions: Permission[];
}
