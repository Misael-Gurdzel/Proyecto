// import { Role } from '../auth/roles.enum';

// export interface UserRequest {
//   id: number;
//   email: string;
//   roles: Role[];
//   isAdmin: boolean;
//   iat: number;
//   exp: number;
// }
import { Request } from 'express';
import { Role } from '../auth/roles.enum';

export interface UserPayload {
  id: number;
  email: string;
  roles: Role[];
  // cualquier otro dato que guardes en el JWT
}

export interface UserRequest extends Request {
  user?: UserPayload;
}
