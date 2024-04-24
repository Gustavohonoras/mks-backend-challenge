import { User } from "src/users/entities/user.entity";

export interface UserPayload {
  sub: number;
  username: string;
  iat?: number;
  exp?: number;
}

export interface UserPayloadToken {
  user: User;
}
