import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
export declare class ArtistService {
    private readonly artistRepository;
    create(createArtistDto: CreateArtistDto): {
        id: string;
        name: string;
        grammy: true;
    };
    findAll(): Promise<ArtistEntity[]>;
    findOne(id: string): Promise<ArtistEntity>;
    update(id: string, updateArtistDto: UpdateArtistDto): Promise<{
        id: string;
        name: string;
        grammy: boolean;
        tracks: import("../tracks/entities/track.entity").TrackEntity[];
        albums: import("../albums/entities/album.entity").AlbumEntity[];
    }>;
    remove(id: string): Promise<string>;
}
