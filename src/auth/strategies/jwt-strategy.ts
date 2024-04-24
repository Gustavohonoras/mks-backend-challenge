import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserFromJwt } from "../models/UserFromJwt";
import { UserPayload } from "../models/UserPayload";
import { UserToken } from "../models/UserToken";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "secret",
    });
  }

  async validateToken(payload: UserToken): Promise<UserFromJwt> {
    return {
      id: Number(payload.access_token),
      username: payload.username,
    };
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
