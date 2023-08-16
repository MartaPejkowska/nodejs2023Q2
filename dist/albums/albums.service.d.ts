import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
export declare class AlbumsService {
    private readonly albumRepository;
    private artistRepository;
    create(createAlbumDto: CreateAlbumDto): Promise<{
        id: string;
        name: string;
        year: number;
        artistId: string;
    }>;
    findAll(): Promise<AlbumEntity[]>;
    findOne(id: string): Promise<AlbumEntity>;
    update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<{
        id: string;
        name: string;
        year: number;
        artistId: string;
        artist: ArtistEntity;
        tracks: import("../tracks/entities/track.entity").TrackEntity[];
    }>;
    remove(id: string): Promise<string>;
}
