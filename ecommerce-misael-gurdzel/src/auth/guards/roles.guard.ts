import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRequest } from '../../interfaces/user-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<UserRequest>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('No user information found in request');
    }

    if (!user.isAdmin) {
      throw new ForbiddenException(
        'No tiene permisos para acceder a esta ruta',
      );
    }

    return true;
  }
}
