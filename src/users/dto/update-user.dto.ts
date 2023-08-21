import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
    @ApiProperty({ example: 'password' })
    oldPassword: string; // previous password

    @ApiProperty({ example: 'password2' })
    newPassword: string; // new password
}
