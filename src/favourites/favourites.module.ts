import { Module } from '@nestjs/common';
import { FavouritesController } from './favourites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
    AlbumFav,
    ArtistFav,
    FavouriteEntity,
    TrackFav,
} from './entities/favourite.entity';
import { FavouritesService } from './favourites.service';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
    imports: [
        ArtistModule,
        AlbumsModule,
        TracksModule,
        TypeOrmModule.forFeature([
            FavouriteEntity,
            TrackEntity,
            AlbumEntity,
            ArtistEntity,
            TrackFav,
            AlbumFav,
            ArtistFav,
        ]),
    ],
    controllers: [FavouritesController],
    providers: [FavouritesService],
})
export class FavouritesModule {}
