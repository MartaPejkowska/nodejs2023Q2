import { Injectable, Body } from '@nestjs/common';
import { User } from './interfaces/User.interface';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.users.find((product) => product.id === id);
    return user;
  }

  async create(@Body() createUserDto: CreateUserDto) {
    // const date = new Date();
    console.log(createUserDto);
    const { login, password } = createUserDto;
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
    const userIndex = await this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];

    const updatedUser = { ...user };
    //check old password
    updatedUser.password = body.newPassword;
    updatedUser.updatedAt = Date.now();
    updatedUser.version = updatedUser.version + 1;

    this.users[userIndex] = updatedUser;
    return this.users[userIndex];
  }

  async delete(id: string) {
    const userIndex = await this.users.findIndex((user) => user.id === id);
    this.users.splice(userIndex, 1);

  }
}
