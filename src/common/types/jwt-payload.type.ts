import { Permission } from '@/common/types/permission.enum';

export interface JwtPayload {
  sub: string;
  role: string;
  permissions: Permission[];
  adminId?: string;
  iat?: number;
  exp?: number;
}
