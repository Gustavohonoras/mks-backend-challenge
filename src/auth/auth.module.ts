import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt/dist";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./service/auth.service";
import { AuthController } from "./controller/auth.controller";
import { JwtAuthGuard } from "./guards/jwt-auth-guard";
import { JwtStrategy } from "./strategies/jwt-strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
