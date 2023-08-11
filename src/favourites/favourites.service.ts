import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { isIdValid } from 'src/utils/isIdValid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import {
    AlbumFav,
    ArtistFav,
    FavouriteEntity,
    TrackFav,
} from './entities/favourite.entity';

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

    async create(params) {
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

            this.trackFavRepository.save({ trackId: trackId });

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
            this.albumFavRepository.save({ albumId: albumId });
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

            this.artistFavRepository.save({ artistId: artistId });

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

    async remove(params) {
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

            this.trackFavRepository.delete({ trackId: trackId });

            return `Succesfully removed ${track.name} from favourites`;
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
            this.albumFavRepository.delete({ albumId: albumId });
            return `Succesfully removed ${album.name} from favourites`;
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

            this.artistFavRepository.delete({ artistId: artistId });

            return `Succesfully removed ${artist.name} from favourites`;
        }
    }
}
