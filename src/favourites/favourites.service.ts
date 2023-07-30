import {
    Injectable,
    Inject,
    UnprocessableEntityException,
    NotFoundException,
} from '@nestjs/common';
import { FavouriteEntity } from './entities/favourite.entity';
import { favourites } from 'src/db/database';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumsService } from 'src/albums/albums.service';
import { isIdValid } from 'src/utils/isIdValid';

@Injectable()
export class FavouritesService {
    @Inject(TracksService)
    private trackService: TracksService;
    @Inject(AlbumsService)
    private albumService: AlbumsService;
    @Inject(ArtistService)
    private artistService: ArtistService;

    favourites: FavouriteEntity = favourites;
    async create(params) {
        if (params.func === 'track') {
            const trackId = params.id;
            isIdValid(trackId);

            const tracks = await this.trackService.findAll();
            const track = tracks.find((track) => track.id === trackId);

            if (!track) {
                throw new UnprocessableEntityException(
                    'There is no such track',
                );
            }

            this.favourites.tracks.push(track);
            return `Succesfully added ${track.name} to favourites`
        } else if (params.func === 'album') {
            const albumId = params.id;
            isIdValid(albumId);

            const albums = await this.albumService.findAll();
            const album = albums.find((album) => album.id === albumId);

            if (!album) {
                throw new UnprocessableEntityException(
                    'There is no such album',
                );
            }

            this.favourites.albums.push(album);
            return `Succesfully added ${album.name} to favourites`
        }
        else if (params.func === 'artist') {
            const artistId = params.id;
            isIdValid(artistId);

            const artists = await this.artistService.findAll();
            const artist = artists.find((artist) => artist.id === artistId);

            if (!artist) {
                throw new UnprocessableEntityException(
                    'There is no such artist',
                );
            }

            this.favourites.artists.push(artist);
            return `Succesfully added ${artist.name} to favourites`
        }
    }

    findAll() {
        return this.favourites;
    }

    async remove(params) {
        if (params.func === 'track') {
            const trackId = params.id;
            isIdValid(trackId);

            const trackIndex = this.favourites.tracks.findIndex(
                (track) => track.id === trackId,
            );
            if (trackIndex === -1) {
                return new NotFoundException('This track in not in favourites');
            }
            this.favourites.tracks.splice(trackIndex, 1);
            return `Removed track with id: ${trackId}`;

        } else if (params.func === 'album') {
            const albumId = params.id;
            isIdValid(albumId);

            const albumIndex = this.favourites.albums.findIndex(
                (album) => album.id === albumId,
            );
            if (albumIndex === -1) {
                return new NotFoundException('This album in not in favourites');
            }
            this.favourites.albums.splice(albumIndex, 1);
            return `Removed album with id: ${albumId}`;
        } else if (params.func === 'artist') {
            const artistId = params.id;
            isIdValid(artistId);

            const artistIndex = this.favourites.artists.findIndex(
                (artist) => artist.id === artistId,
            );
            if (artistIndex === -1) {
                return new NotFoundException(
                    'This artist in not in favourites',
                );
            }
            this.favourites.artists.splice(artistIndex, 1);
            return `Removed artist with id: ${artistId}`;
        }
    }
}
