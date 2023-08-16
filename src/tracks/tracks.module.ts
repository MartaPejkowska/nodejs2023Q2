import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TrackEntity]),
        TypeOrmModule.forFeature([AlbumEntity]),
        TypeOrmModule.forFeature([ArtistEntity]),
    ],
    controllers: [TracksController],
    providers: [TracksService],
    exports: [TracksService],
})
export class TracksModule {}
