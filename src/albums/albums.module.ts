import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([AlbumEntity]),
        TypeOrmModule.forFeature([ArtistEntity]),
    ],
    controllers: [AlbumsController],
    providers: [AlbumsService],
    exports: [AlbumsService],
})
export class AlbumsModule {}
