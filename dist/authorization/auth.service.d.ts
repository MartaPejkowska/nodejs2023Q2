import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entity/user.entity';
export declare class AuthService {
    private readonly userRepository;
    private readonly helper;
    register(body: CreateUserDto): Promise<Partial<UserEntity> | never>;
    login(body: CreateUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: any): Promise<void>;
}
