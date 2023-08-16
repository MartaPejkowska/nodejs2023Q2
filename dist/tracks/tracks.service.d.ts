import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
export declare class TracksService {
    private readonly trackRepository;
    private artistRepository;
    private albumRepository;
    create(createTrackDto: CreateTrackDto): Promise<{
        id: string;
        name: string;
        artistId: string;
        albumId: string;
        duration: number;
    }>;
    findAll(): Promise<TrackEntity[]>;
    findOne(id: string): Promise<TrackEntity>;
    update(id: string, updateTrackDto: UpdateTrackDto): Promise<{
        id: string;
        name: string;
        artistId: string;
        albumId: string;
        duration: number;
        album: AlbumEntity;
        artist: ArtistEntity;
    }>;
    remove(id: string): Promise<string>;
}
