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
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MyLogger } from 'src/logger/logger.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>;

    private readonly logger = new MyLogger('User');

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
        console.log('in create');
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
        await this.userRepository.save(user);
        const { password, ...userWP } = user;
        console.log(user);
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
            // typeof body.oldPassword !== 'string' ||
            typeof body.newPassword !== 'string'
        ) {
            throw new BadRequestException(
                'Old password and new password are required and must be a string',
            );
        }
        console.log(bcrypt.compareSync(user.password, body.oldPassword))
        if (bcrypt.compareSync(user.password, body.oldPassword)) {

            user.password = body.newPassword;
            user.updatedAt = new Date().getTime();
            user.version++;

            await this.userRepository.save(user);
            const { password, ...userWP } = user;
            return userWP;
        } else {
            throw new ForbiddenException('Wrong password');
        }
    }

    async delete(id: string) {
        isIdValid(id);
        const user = await this.userRepository.findOne({
            where: { id: id },
        });

        if (!user) {
            throw new NotFoundException('Not found');
        } else {
            await this.userRepository.remove(user);
        }
    }
}
