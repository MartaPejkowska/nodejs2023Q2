import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
    @ApiProperty({ example: 'Eminem' })
    name?: string;

    @ApiProperty({ example: 'true' })
    grammy?: boolean;
}
