import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
export declare class ArtistController {
    private readonly artistService;
    constructor(artistService: ArtistService);
    create(createArtistDto: CreateArtistDto): {
        id: string;
        name: string;
        grammy: true;
    };
    findAll(): Promise<import("./entities/artist.entity").ArtistEntity[]>;
    findOne(id: string): Promise<import("./entities/artist.entity").ArtistEntity>;
    update(id: string, updateArtistDto: UpdateArtistDto): Promise<{
        id: string;
        name: string;
        grammy: boolean;
        tracks: import("../tracks/entities/track.entity").TrackEntity[];
        albums: import("../albums/entities/album.entity").AlbumEntity[];
    }>;
    remove(id: string): Promise<string>;
}
