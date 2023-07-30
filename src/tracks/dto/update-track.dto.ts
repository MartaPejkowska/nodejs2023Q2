import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
    @ApiProperty({ example: 'Eminem' })
    name?: string;

    @ApiProperty({ example: '1197d507-8f1d-47e6-805a-7679b9cd19ab' })
    artistId?: string | null; // refers to Artist

    @ApiProperty({ example: 'a4b6a8f4-8392-4331-bf99-10f7c39d5772' })
    albumId?: string | null; // refers to Album

    @ApiProperty({ example: '300' })
    duration?: number; // integer number
}
