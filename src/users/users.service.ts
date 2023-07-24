import {
  Injectable,
  Body,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { User } from './interfaces/User.interface';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

const regexExp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

@Injectable()
export class UsersService {
  users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  async findOne(id: string): Promise<User | string> {
    if (!regexExp.test(id)) {
      throw new BadRequestException('Not valid id');
    }
    const user = await this.users.find((product) => product.id === id);
    if (!user) {
      throw new NotFoundException('Not found');
    }
    return user;
  }

  async create(@Body() createUserDto: CreateUserDto) {
    // const date = new Date();
    const { login, password } = createUserDto;
    if (!login || !password) {
      throw new BadRequestException('Login and password are required');
    }
    const user = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    return user;
  }

  async update(id: string, body: UpdatePasswordDto) {
    if (!regexExp.test(id)) {
      throw new BadRequestException('Not valid id');
    }
    const userIndex = await this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];

    if (!user) {
      throw new NotFoundException('Not found');
    }

    if (user.password !== body.oldPassword) {
      throw new ForbiddenException('Wrong password');
    }

    const updatedUser = { ...user };

    updatedUser.password = body.newPassword;
    updatedUser.updatedAt = Date.now();
    updatedUser.version = updatedUser.version + 1;

    this.users[userIndex] = updatedUser;
    return this.users[userIndex];
  }

  @HttpCode(204)
  async delete(id: string) {
    if (!regexExp.test(id)) {
      throw new BadRequestException('Not valid id');
    }
    const userIndex = await this.users.findIndex((user) => user.id === id);

    if (!userIndex) {
      throw new NotFoundException('Not found');
    }
    this.users.splice(userIndex, 1);
  }
}
