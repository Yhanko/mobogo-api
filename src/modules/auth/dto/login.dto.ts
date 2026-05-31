import { IsString, IsOptional, MinLength, Matches } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  @Matches(/^\+\d{9,15}$/, {
    message: 'Telefone inválido. Formato: +244923000000',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @Matches(/^TAX-[A-F0-9]{8}$/, {
    message: 'Display ID inválido. Formato: TAX-XXXXXXXX',
  })
  displayId?: string;

  // Password para admin/agente/cliente/taxista — PIN para passageiro sem telefone
  @IsString()
  @MinLength(4, { message: 'Credencial deve ter pelo menos 4 caracteres' })
  credential: string;
}
