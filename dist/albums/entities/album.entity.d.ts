import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
export declare class AlbumEntity {
    id: string;
    name: string;
    year: number;
    artistId: string | null;
    artist: ArtistEntity;
    tracks: TrackEntity[];
}
