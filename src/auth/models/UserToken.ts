import { User } from "src/users/entities/user.entity";

export interface UserToken {
  username?: string;
  access_token: string;
  user: User;
}
