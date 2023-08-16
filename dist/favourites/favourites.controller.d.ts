import { FavouritesService } from './favourites.service';
interface paramsDTO {
    func: string;
    id: string;
}
export declare class FavouritesController {
    private readonly favouritesService;
    constructor(favouritesService: FavouritesService);
    findAll(): Promise<{
        artists: import("../artist/entities/artist.entity").ArtistEntity[];
        albums: import("../albums/entities/album.entity").AlbumEntity[];
        tracks: import("../tracks/entities/track.entity").TrackEntity[];
    }>;
    create(params: paramsDTO): Promise<string>;
    remove(params: paramsDTO): Promise<string>;
}
export {};
