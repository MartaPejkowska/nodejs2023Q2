import {
    Injectable,
    Body,
    BadRequestException,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { isIdValid } from 'src/utils/isIdValid';
// import { users } from 'src/db/database';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>;
    // users: UserEntity[] = users;

    async findAll(): Promise<UserEntity[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async findOne(id: string): Promise<Partial<UserEntity> | string> {
        isIdValid(id);
        const user = await this.userRepository.findOne({
            where: { id: id },
        });
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
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };
        this.userRepository.save(user);
        const { password, ...userWP } = user;

        return userWP;
    }

    async update(id: string, body: UpdatePasswordDto) {
        isIdValid(id);
        const user = await this.userRepository.findOne({
            where: { id: id },
        });

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
        user.updatedAt = new Date().getTime();
        updatedUser.version = updatedUser.version + 1;

        this.userRepository.save(updatedUser);
        const { password, ...userWP } = updatedUser;
        return userWP;
    }

    async delete(id: string) {
        isIdValid(id);
        const user = await this.userRepository.findOne({
            where: { id: id },
        });

        if (!user) {
            throw new NotFoundException('Not found');
        } else {
            this.userRepository.remove(user);
        }
    }
}
