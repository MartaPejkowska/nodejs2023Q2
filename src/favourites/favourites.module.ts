import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
    imports: [TracksModule, ArtistModule, AlbumsModule],
    controllers: [FavouritesController],
    providers: [FavouritesService],
})
export class FavouritesModule {}
