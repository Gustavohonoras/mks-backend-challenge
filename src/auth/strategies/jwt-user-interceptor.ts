import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { JwtPayload } from "../interface/jwt-payload.interface";

@Injectable()
export class JwtUserInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace("Bearer ", "");
    if (token) {
      const user: JwtPayload = this.jwtService.decode(token) as JwtPayload;
      request.user = user;
    }
    return next.handle();
  }
}
