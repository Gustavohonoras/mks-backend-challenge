import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/service/users.service";
import { User } from "src/users/entities/user.entity";
import { UserToken } from "../models/UserToken";
import { UserPayload } from "../models/UserPayload";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<string> {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const payload: UserPayload = {
      sub: user.id,
      username: user.username,
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error("Invalid user");
  }

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<{ token: string; message: string; status: number }> {
    try {
      const createdUser = await this.userService.create(createUserDto);
      const token = this.generateAccessToken(createdUser);

      return {
        status: 201,
        token,
        message: "User created successfully",
      };
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username already exists");
      }
      throw error;
    }
  }

  private generateAccessToken(user: User): string {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
