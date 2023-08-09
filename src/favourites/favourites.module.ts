import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
// import { TracksModule } from 'src/tracks/tracks.module';
// import { ArtistModule } from 'src/artist/artist.module';
// import { AlbumsModule } from 'src/albums/albums.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { FavouriteEntity } from './entities/favourite.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([FavouriteEntity]),
        TypeOrmModule.forFeature([TrackEntity]),
        TypeOrmModule.forFeature([AlbumEntity]),
        TypeOrmModule.forFeature([ArtistEntity]),
    ],
    controllers: [FavouritesController],
    providers: [FavouritesService],
})
export class FavouritesModule {}
