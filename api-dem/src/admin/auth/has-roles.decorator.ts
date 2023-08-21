import { SetMetadata } from '@nestjs/common';
import { UserRoles } from './user-roles.enum';

export const HasRoles = (...roles: UserRoles[]) =>
	SetMetadata('roles', roles);
