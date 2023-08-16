import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
export declare class TrackEntity {
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
    album: AlbumEntity;
    artist: ArtistEntity;
}
