import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavouriteEntity } from 'src/favourites/entities/favourite.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { UserEntity } from 'src/users/entity/user.entity';

export const users: UserEntity[] = [{
    "id": "1197d507-8f1d-47e6-805a-7679b9cd19a0",
    "login": "Marta",
    "password": "password",
    "version": 2,
    "createdAt": 1690372436970,
    "updatedAt": 1690372458913
}];
export const artists: ArtistEntity[] = [{
    "id":"1197d507-8f1d-47e6-805a-7679b9cd19ab",
"name":"Eminem",
"grammy":true}];
export const tracks: TrackEntity[] = [];
export const albums: AlbumEntity[] = [];
export const favourites: FavouriteEntity[] = [];
