import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
export declare class AlbumsController {
    private readonly albumsService;
    constructor(albumsService: AlbumsService);
    create(createAlbumDto: CreateAlbumDto): Promise<{
        id: string;
        name: string;
        year: number;
        artistId: string;
    }>;
    findAll(): Promise<import("./entities/album.entity").AlbumEntity[]>;
    findOne(id: string): Promise<import("./entities/album.entity").AlbumEntity>;
    update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<{
        id: string;
        name: string;
        year: number;
        artistId: string;
        artist: import("../artist/entities/artist.entity").ArtistEntity;
        tracks: import("../tracks/entities/track.entity").TrackEntity[];
    }>;
    remove(id: string): Promise<string>;
}
