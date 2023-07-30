import { ApiProperty } from '@nestjs/swagger';

export class CreateFavouriteDto {
    @ApiProperty({ example: 'f394fa38-9322-47d1-9c1e-6e18c5df3291' })
    trackId?: string;

    @ApiProperty({ example: 'a4b6a8f4-8392-4331-bf99-10f7c39d5772' })
    albumId?: string;

    @ApiProperty({ example: '1197d507-8f1d-47e6-805a-7679b9cd19ab' })
    artistId?: string;
}
