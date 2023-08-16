import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<string | Partial<UserEntity>>;
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        login: string;
        version: number;
        createdAt: number;
        updatedAt: number;
    }>;
    update(id: string, updatePasswordDto: UpdatePasswordDto): Promise<{
        id: string;
        login: string;
        version: number;
        createdAt: number;
        updatedAt: number;
    }>;
    delete(id: string): Promise<void>;
}
