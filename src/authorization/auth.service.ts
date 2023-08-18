import {
    BadRequestException,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { AuthHelper } from './auth.helper';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { type } from 'os';

@Injectable()
export class AuthService {
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>;

    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    // @Inject(ConfigService)
    // private config: ConfigService;

    async register(body: CreateUserDto): Promise<Partial<UserEntity> | never> {

        // const user: UserEntity = await this.userRepository.findOneBy({
        //     login,
        // });

        // if (user) {
        //     throw new HttpException(
        //         'That user already exists',
        //         HttpStatus.CONFLICT,
        //     );
        // }

        if (
            !body.login ||
            !body.password ||
            typeof body.login !== 'string' ||
            typeof body.password !== 'string'
        ) {
            throw new BadRequestException(
                'Login and password are required and must be a string',
            );
        }
        const hashPassword = await bcrypt.hash(
            body.password,
            +process.env.CRYPT_SALT,
        );

        const newUser = {
            id: uuidv4(),
            login: body.login,
            password: hashPassword,
            version: 1,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };
        console.log(newUser)

        await this.userRepository.save(newUser);
        const { password, ...userWP } = newUser;
        return userWP;
    }

    public async login(body: CreateUserDto) {
        const { login, password }: CreateUserDto = body;

        if (
            !login ||
            !password ||
            typeof login !== 'string' ||
            typeof password !== 'string'
        ) {
            throw new BadRequestException(
                'Login and password are required and must be a string',
            );
        }
        const user: UserEntity = await this.userRepository.findOne({
            where: { login },
        });

        if (!user) {
            throw new ForbiddenException('No such user');
        }

        const isPasswordValid: boolean = this.helper.isPasswordValid(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new ForbiddenException('Wrong password');
        }

        return this.helper.generateToken(user);
    }

    // public async refresh(user: UserEntity): Promise<string> {

    //     return this.helper.generateToken(user);
    // }
}
