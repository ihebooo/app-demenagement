import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from './user-roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true; // Allow access if no roles are defined for the route
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user role is included in the allowed roles
    return roles.includes(user.role);
  }
}
