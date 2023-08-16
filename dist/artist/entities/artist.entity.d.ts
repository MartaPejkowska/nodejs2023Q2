import { TrackEntity } from 'src/tracks/entities/track.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
export declare class ArtistEntity {
    id: string;
    name: string;
    grammy: boolean;
    tracks: TrackEntity[];
    albums: AlbumEntity[];
}
