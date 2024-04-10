import { SetMetadata } from '@nestjs/common';
import { Roles } from '../../auth/entities/auth.entities';

export const ROLES_KEY = 'roles';
export const Role = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
