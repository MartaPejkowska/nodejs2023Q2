import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
    @ApiProperty({ example: '8 mile O.S.T.' })
    name?: string;

    @ApiProperty({ example: '2002' })
    year?: number;

    @ApiProperty({ example: 'a4b6a8f4-8392-4331-bf99-10f7c39d5772' })
    artistId?: string | null;
}
