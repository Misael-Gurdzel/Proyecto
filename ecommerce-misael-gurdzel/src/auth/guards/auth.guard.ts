import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import ENV from 'src/config/enviroment';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No se ha enviado un token');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    try {
      const secret = ENV.JWT_SECRET;
      const payload = this.jwtService.verify<JwtPayload>(token, { secret });

      // Adjuntar info al request
      request.user = {
        id: payload.id,
        email: payload.email,
        isAdmin: payload.isAdmin,
        iat: payload.iat,
        exp: payload.exp,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
