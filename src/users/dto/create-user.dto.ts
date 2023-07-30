import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Marta' })
    login: string;

    @ApiProperty({ example: 'password' })
    password: string;
}
