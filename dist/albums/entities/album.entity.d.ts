import { ArtistEntity } from 'src/artist/entities/artist.entity';
export declare class AlbumEntity {
    id: string;
    name: string;
    year: number;
    artistId: string | null;
    artist: ArtistEntity;
}
