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
    public async decode(token: string) {
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

    public async generateRefreshToken(user: UserEntity) {
        const refreshToken = await this.jwt.signAsync(
            { id: user.id, login: user.login },
            {
                secret: process.env.JWT_SECRET_REFRESH_KEY,
                expiresIn: +process.env.TOKEN_REFRESH_EXPIRE_TIME,
            },
        );
        return { refreshToken: refreshToken };
    }

    public async generateBothTokens(user: UserEntity) {
        const [accessToken, refreshToken] = await Promise.all([
            await this.jwt.signAsync(
                { id: user.id, login: user.login },
                {
                    secret: process.env.JWT_SECRET_KEY,
                    expiresIn: +process.env.TOKEN_EXPIRE_TIME,
                },
            ),
            await this.jwt.signAsync(
                { id: user.id, login: user.login },
                {
                    secret: process.env.JWT_SECRET_REFRESH_KEY,
                    expiresIn: +process.env.TOKEN_REFRESH_EXPIRE_TIME,
                },
            ),
        ]);
        const tokens = { accessToken, refreshToken };
        return tokens;
    }
    // Validate User's password
    public isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }

    // Validate JWT Token, throw forbidden error if JWT Token is invalid
    public async validateRefreshToken(
        refreshToken: string,
    ): Promise<boolean | never> {
        try {
            const decoded: unknown = this.jwt.verify(refreshToken);

            if (!decoded) {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
            console.log(decoded)

            const user: UserEntity = await this.validateUser(decoded);
            console.log(user)

            if (!user) {
                throw new UnauthorizedException();
            }

            const isRefreshTokenMatching = await bcrypt.compare(
                refreshToken,
                user.refresh_token,
            );
            if (!isRefreshTokenMatching) {
                throw new UnauthorizedException('Invalid token');
            }
            await this.jwt.verifyAsync(refreshToken, {
                secret: process.env.JWT_SECRET_REFRESH_KEY,
            });
            return true
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }

    // public async validateAccessToken(accessToken: string) {
    //     const decodedAccess = this.jwt.verify(accessToken);
    //     if (!decodedAccess) {
    //         throw new UnauthorizedException('Unauthorized');
    //     }
    // }

    public async updateRefreshtoken(userId: string) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
        const newRefreshToken = await this.generateRefreshToken(user);

        return await (user.refresh_token = newRefreshToken.refreshToken);
    }
}
