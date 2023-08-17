import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
export declare class TrackEntity {
    id: string;
    name: string;
    artist: ArtistEntity;
    artistId: string | null;
    album: AlbumEntity;
    albumId: string | null;
    duration: number;
}
