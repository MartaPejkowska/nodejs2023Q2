import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entity/user.entity';
export declare class AuthHelper {
    private readonly userRepository;
    private readonly jwt;
    constructor(jwt: JwtService);
    decode(token: string): Promise<string | {
        [key: string]: any;
    }>;
    validateUser(decoded: any): Promise<UserEntity>;
    generateToken(user: UserEntity): Promise<{
        accessToken: string;
    }>;
    generateRefreshToken(user: UserEntity): Promise<{
        refreshToken: string;
    }>;
    generateBothTokens(user: UserEntity): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    isPasswordValid(password: string, userPassword: string): boolean;
    validateRefreshToken(refreshToken: string): Promise<boolean | never>;
    updateRefreshtoken(userId: string): Promise<string>;
}
