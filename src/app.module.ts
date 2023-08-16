import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavouritesModule } from './favourites/favourites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        UsersModule,
        ArtistModule,
        TracksModule,
        AlbumsModule,
        FavouritesModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.PG_HOST,
            port: +process.env.PG_PORT,
            username: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
