import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entity/user.entity';
export declare class AuthHelper {
    private readonly userRepository;
    private readonly jwt;
    constructor(jwt: JwtService);
    decode(token: string): Promise<unknown>;
    validateUser(decoded: any): Promise<UserEntity>;
    generateToken(user: UserEntity): Promise<{
        accessToken: string;
    }>;
    isPasswordValid(password: string, userPassword: string): boolean;
}
