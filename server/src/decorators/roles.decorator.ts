import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/constants/user.constants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);
