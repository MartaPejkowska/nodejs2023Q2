import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [UsersModule, ArtistModule, TracksModule, AlbumsModule, FavouritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
