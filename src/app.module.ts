import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { Movie } from "./movies/entities/movie.entity";
import { UsersModule } from "./users/users.module";
import { AuthService } from "./auth/service/auth.service";
import { JwtStrategy } from "./auth/strategies/jwt-strategy";
import { AuthModule } from "./auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { MoviesModule } from "./movies/movies.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "127.0.0.1",
      port: 5432,
      username: "admin",
      password: "password",
      database: "mks-backend",
      entities: [User, Movie],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forFeature([User, Movie]),
    MoviesModule,
  ],

  providers: [AuthService, JwtService, JwtStrategy],
})
export class AppModule {}
