import { CreateUserDto } from "../dto/create-user.dto";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username: username } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }
}
