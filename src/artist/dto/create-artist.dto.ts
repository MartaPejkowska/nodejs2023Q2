import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
    @ApiProperty({ example: 'Eminem' })
    name: string;

    @ApiProperty({ example: 'true' })
    grammy: boolean;
}
