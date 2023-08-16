import { UserEntity } from './entity/user.entity';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly logger;
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<Partial<UserEntity> | string>;
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        login: string;
        version: number;
        createdAt: number;
        updatedAt: number;
    }>;
    update(id: string, body: UpdatePasswordDto): Promise<{
        id: string;
        login: string;
        version: number;
        createdAt: number;
        updatedAt: number;
    }>;
    delete(id: string): Promise<void>;
}
