import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
export declare class ArtistService {
    private readonly artistRepository;
    private readonly trackRepository;
    private readonly albumRepository;
    create(createArtistDto: CreateArtistDto): Promise<{
        id: string;
        name: string;
        grammy: true;
    }>;
    findAll(): Promise<ArtistEntity[]>;
    findOne(id: string): Promise<ArtistEntity>;
    update(id: string, updateArtistDto: UpdateArtistDto): Promise<{
        id: string;
        name: string;
        grammy: boolean;
    }>;
    remove(id: string): Promise<string>;
}
