import { Request } from 'express';

export interface UserPayload {
  id: number;
  email: string;
  isAdmin: boolean;
  // cualquier otro dato que guardes en el JWT
}

export interface UserRequest extends Request {
  user?: UserPayload;
}
