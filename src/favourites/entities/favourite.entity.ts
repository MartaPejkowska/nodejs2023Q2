import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';

export class FavouriteEntity {
    artists?: ArtistEntity[];
    albums?: AlbumEntity[];
    tracks?: TrackEntity[];
}
