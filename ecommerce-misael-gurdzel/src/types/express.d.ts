import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { Role } from '../auth/roles.enum';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export interface UserRequest {
  id: number;
  email: string;
  roles: Role[];
  isAdmin: boolean;
  iat: number;
  exp: number;
}
