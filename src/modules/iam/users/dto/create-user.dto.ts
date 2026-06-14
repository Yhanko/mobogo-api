import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Role } from '@/prisma';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  // Telefone OU displayId — validação de presença mínima feita no service
  @IsOptional()
  @IsString()
  @Matches(/^\+\d{9,15}$/, {
    message: 'Telefone inválido. Formato: +244923000000',
  })
  phone?: string;

  // Apenas para passageiros sem telefone — gerado automaticamente se omitido
  @IsOptional()
  @IsString()
  @Matches(/^TAX-[A-F0-9]{8}$/, {
    message: 'Display ID inválido. Formato: TAX-XXXXXXXX',
  })
  displayId?: string;

  // Password para admin/agente/cliente/taxista — PIN 4 dígitos para passageiro sem telefone
  @IsString()
  @MinLength(4, { message: 'Credencial mínima de 4 caracteres' })
  @MaxLength(128, { message: 'Credencial demasiado longa' })
  credential: string;

  @IsEnum(Role, {
    message: `Role inválido. Valores: ${Object.values(Role).join(', ')}`,
  })
  role: Role;
}
