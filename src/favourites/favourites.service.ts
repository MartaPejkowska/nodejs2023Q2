import {
    Inject,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { isIdValid } from 'src/utils/isIdValid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumFav, ArtistFav, TrackFav } from './entities/favourite.entity';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';

interface paramsDTO {
    func: string;
    id: string;
}

@Injectable()
export class FavouritesService {
    constructor(
        @InjectRepository(ArtistFav)
        private readonly artistFavRepository: Repository<ArtistFav>,
        @InjectRepository(ArtistEntity)
        private readonly artistRepository: Repository<ArtistEntity>,

        @InjectRepository(TrackFav)
        private readonly trackFavRepository: Repository<TrackFav>,
        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>,

        @InjectRepository(AlbumFav)
        private readonly albumFavRepository: Repository<AlbumFav>,
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
    ) {}

    @Inject(ArtistService)
    private artistService: ArtistService;
    @Inject(AlbumsService)
    private albumsService: AlbumsService;
    @Inject(TracksService)
    private tracksService: TracksService;

    async create(params: paramsDTO) {
        if (params.func === 'track') {
            const trackId = params.id;
            isIdValid(trackId);

            const track = await this.trackRepository.findOne({
                where: { id: trackId },
            });

            if (!track) {
                throw new UnprocessableEntityException(
                    'There is no such track',
                );
            }

            const trackFav = new TrackFav();
            trackFav.track = track;

            await this.trackFavRepository.save(trackFav);

            return `Succesfully added ${track.name} to favourites`;
        } else if (params.func === 'album') {
            const albumId = params.id;
            isIdValid(albumId);

            const album = await this.albumRepository.findOne({
                where: { id: albumId },
            });

            if (!album) {
                throw new UnprocessableEntityException(
                    'There is no such album',
                );
            }
            const albumFav = new AlbumFav();
            albumFav.album = album;

            await this.albumFavRepository.save(albumFav);

            return `Succesfully added ${album.name} to favourites`;
        } else if (params.func === 'artist') {
            const artistId = params.id;
            isIdValid(artistId);

            const artist = await this.artistRepository.findOne({
                where: { id: artistId },
            });

            if (!artist) {
                throw new UnprocessableEntityException(
                    'There is no such artist',
                );
            }

            const artistFav = new ArtistFav();
            artistFav.artist = artist;

            await this.artistFavRepository.save(artistFav);

            return `Succesfully added ${artist.name} to favourites`;
        }
    }

    async findAll() {
        const artistFavs = await this.artistFavRepository.find({
            relations: { artist: true },
        });
        const albumFavs = await this.albumFavRepository.find({
            relations: { album: true },
        });
        const trackFavs = await this.trackFavRepository.find({
            relations: { track: true },
        });

        const artists = artistFavs.map((artistFav) => artistFav.artist);
        const albums = albumFavs.map((albumFav) => albumFav.album);
        const tracks = trackFavs.map((trackFav) => trackFav.track);

        return { artists, albums, tracks };
    }

    async remove(params: paramsDTO) {
        if (params.func === 'track') {
            console.log(params);
            const trackId = params.id;
            isIdValid(trackId);

            const track = await this.trackFavRepository.findOne({
                where: { trackId },
            });

            if (!track) {
                throw new UnprocessableEntityException(
                    'There is no such track in favourites',
                );
            }

            await this.trackFavRepository.delete(track.id);

            return `Succesfully removed ${track} from favourites`;
        } else if (params.func === 'album') {
            const albumId = params.id;
            isIdValid(albumId);

            const album = await this.albumFavRepository.findOne({
                where: { albumId },
            });

            if (!album) {
                throw new UnprocessableEntityException(
                    'There is no such album in favourites',
                );
            }
            await this.albumFavRepository.delete(album.id);

            return `Succesfully removed ${album} from favourites`;
        } else if (params.func === 'artist') {
            const artistId = params.id;
            isIdValid(artistId);

            const artist = await this.artistFavRepository.findOne({
                where: { artistId },
            });

            if (!artist) {
                throw new UnprocessableEntityException(
                    'There is no such artist in favourites',
                );
            }

            this.artistFavRepository.delete(artist.id);

            return `Succesfully removed ${artist} from favourites`;
        }
    }
}
