import { Repository } from 'typeorm';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumFav, ArtistFav, TrackFav } from './entities/favourite.entity';
export declare class FavouritesService {
    private readonly artistFavRepository;
    private readonly artistRepository;
    private readonly trackFavRepository;
    private readonly trackRepository;
    private readonly albumFavRepository;
    private readonly albumRepository;
    constructor(artistFavRepository: Repository<ArtistFav>, artistRepository: Repository<ArtistEntity>, trackFavRepository: Repository<TrackFav>, trackRepository: Repository<TrackEntity>, albumFavRepository: Repository<AlbumFav>, albumRepository: Repository<AlbumEntity>);
    create(params: any): Promise<string>;
    findAll(): Promise<{
        artists: ArtistEntity[];
        albums: AlbumEntity[];
        tracks: TrackEntity[];
    }>;
    remove(params: any): Promise<string>;
}
