import {
    Injectable,
    Body,
    BadRequestException,
    NotFoundException,
    ForbiddenException,
    HttpCode,
} from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { isIdValid } from 'src/utils/isIdValid';
import { users } from 'src/db/database';

@Injectable()
export class UsersService {
    users: UserEntity[] = users;

    findAll(): UserEntity[] {
        return this.users;
    }

    async findOne(id: string): Promise<Partial<UserEntity> | string> {
        isIdValid(id);
        const user = await this.users.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException('Not found');
        }
        const { password, ...userWP } = user;
        return userWP;
    }

    async create(@Body() createUserDto: CreateUserDto) {
        if (!createUserDto.login || !createUserDto.password) {
            throw new BadRequestException('Login and password are required');
        }
        const user = {
            id: uuidv4(),
            login: createUserDto.login,
            password: createUserDto.password,
            version: 1,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        this.users.push(user);
        const { password, ...userWP } = user;

        return userWP;
    }

    async update(id: string, body: UpdatePasswordDto) {
        isIdValid(id);
        const userIndex = await this.users.findIndex((user) => user.id === id);
        const user = this.users[userIndex];

        if (!user) {
            throw new NotFoundException('Not found');
        }

        if (
            !body.oldPassword ||
            !body.newPassword ||
            typeof body.oldPassword !== 'string' ||
            typeof body.newPassword !== 'string'
        ) {
            throw new BadRequestException(
                'Old password and new password are required and must be a string',
            );
        }

        if (user.password !== body.oldPassword) {
            throw new ForbiddenException('Wrong password');
        }

        const updatedUser = { ...user };

        updatedUser.password = body.newPassword;
        updatedUser.updatedAt = Date.now();
        updatedUser.version = updatedUser.version + 1;

        this.users[userIndex] = updatedUser;
        const { password, ...userWP } = updatedUser;
        return userWP;
    }

    async delete(id: string) {
        isIdValid(id);
        const userIndex = this.users.findIndex((user) => user.id === id);
        console.log(userIndex);

        if (userIndex === -1) {
            throw new NotFoundException('Not found');
        } else {
            this.users.splice(userIndex, 1);
        }
    }
}
