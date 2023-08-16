import {
    Injectable,
    HttpException,
    HttpStatus,
    UnauthorizedException,
    Global,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entity/user.entity';

@Global()
@Injectable()
export class AuthHelper {
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>;

    private readonly jwt: JwtService;

    constructor(jwt: JwtService) {
        this.jwt = jwt;
    }

    // Decoding the JWT Token
    public async decode(token: string): Promise<unknown> {
        return this.jwt.decode(token, null);
    }

    // Get User by User ID we get from decode()
    public async validateUser(decoded: any): Promise<UserEntity> {
        return this.userRepository.findOne(decoded.id);
    }

    // Generate JWT Token
    public async generateToken(user: UserEntity) {
        const token = await this.jwt.signAsync(
            { id: user.id, login: user.login },
            {
                secret: process.env.JWT_SECRET_KEY,
                expiresIn: +process.env.TOKEN_EXPIRE_TIME,
            },
        );
        return { accessToken: token };
    }

    // Validate User's password
    public isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }

    // Validate JWT Token, throw forbidden error if JWT Token is invalid
    // public async validate(token: string): Promise<boolean | never> {
    //     const decoded: unknown = this.jwt.verify(token);

    //     if (!decoded) {
    //         throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    //     }

    //     const user: UserEntity = await this.validateUser(decoded);

    //     if (!user) {
    //         throw new UnauthorizedException();
    //     }

    //     return true;
    // }
}
