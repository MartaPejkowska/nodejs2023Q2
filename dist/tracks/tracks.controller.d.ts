import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
export declare class TracksController {
    private readonly tracksService;
    constructor(tracksService: TracksService);
    create(createTrackDto: CreateTrackDto): Promise<{
        id: string;
        name: string;
        artistId: string;
        albumId: string;
        duration: number;
    }>;
    findAll(): Promise<import("./entities/track.entity").TrackEntity[]>;
    findOne(id: string): Promise<import("./entities/track.entity").TrackEntity>;
    update(id: string, updateTrackDto: UpdateTrackDto): Promise<{
        id: string;
        name: string;
        artist: import("../artist/entities/artist.entity").ArtistEntity;
        artistId: string;
        album: import("../albums/entities/album.entity").AlbumEntity;
        albumId: string;
        duration: number;
    }>;
    remove(id: string): Promise<string>;
}
