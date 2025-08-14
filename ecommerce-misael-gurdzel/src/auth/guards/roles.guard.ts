import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      // Si no se definieron roles, la ruta no requiere autorización por roles
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles: Role[] = request.user?.roles ?? [];

    const hasRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(
        'No tiene permisos para acceder a esta ruta',
      );
    }

    return true;
  }
}

// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { Roles } from 'src/decorators/roles.decorators';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
//       context.getHandler(),
//       context.getClass(),
//     ]); //* Roles permitidos: ['admin', 'superadmin' ]

//     const request = context.switchToHttp().getRequest();
//     //* request.user.roles =  [ 'admin', 'tester' ]

//     const hasRole = () =>
//       requiredRoles.some((role) => request.user?.roles?.includes(role));
//     const valid = request.user && request.user.roles && hasRole();

//     if (!valid) {
//       throw new ForbiddenException(
//         'No tiene permisos para acceder a esta ruta',
//       );
//     }

//     return true;
//   }
// }
