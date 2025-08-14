import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import ENV from 'src/config/enviroment';
import { Role } from '../roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No se ha enviado un token');
    }

    try {
      const secret = ENV.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });

      // Normalizamos el usuario en la request
      const roles: Role[] = payload.isAdmin ? [Role.Admin] : [Role.User];

      request.user = {
        id: payload.id,
        email: payload.email,
        isAdmin: payload.isAdmin ?? false,
        roles,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Error al validar token');
    }
  }
}

// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Observable } from 'rxjs';
// import ENV from 'src/config/enviroment';
// import { Role } from '../roles.enum';

// // function validate(request: Request) {
// //   const authHeader = request.headers['authorization'];
// //   if (!authHeader) return false;

// //   const auth = authHeader.split(' ')[1];
// //   if (!auth) return false;

// //   const [email, password] = auth.split(':');
// //   if (!email || !password) return false;

// //   return true;
// // }

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     //* 'Bearer JWToken'
//     const token = request.headers.authorization?.split(' ')[1];
//     if (!token) {
//       throw new UnauthorizedException('No se ha enviado un token');
//     }
//     try {
//       const secret = ENV.JWT_SECRET;
//       const user = this.jwtService.verify(token, { secret });

//       //*payload => Datos del user logueado
//       payload.exp = new Date(payload.exp * 1000);
//       payload.roles = payload.isAdmin ? [Role.Admin] : [Role.User];
//       request.user = payload;

//       //* isAdmin: true || false => ['admin'] || ['user']

//       return true;
//     } catch (error) {
//       throw new UnauthorizedException('Error al validar token');
//     }
//   }
// }
