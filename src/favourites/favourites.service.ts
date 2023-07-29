import {
    Injectable,
    Inject,
    UnprocessableEntityException,
    NotFoundException,
} from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { FavouriteEntity } from './entities/favourite.entity';
import { favourites } from 'src/db/database';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumsService } from 'src/albums/albums.service';
import { isIdValid } from 'src/utils/isIdValid';

@Injectable()
export class FavouritesService {
    @Inject(TracksService)
    @Inject(ArtistService)
    @Inject(AlbumsService)
    private trackService: TracksService;
    private artistService: ArtistService;
    private albumService: AlbumsService;
    favourites: FavouriteEntity = favourites;
    async create(params) {
        console.log(favourites);
        const favTracks = favourites.tracks;
        console.log(favTracks);

        if (params.func === 'track') {
            console.log('params', params);
            const trackId = params.id;
            console.log(trackId);
            isIdValid(trackId);
            const track = await this.trackService.findOne(trackId);
            console.log('track', track);
            if (!track) {
                throw new UnprocessableEntityException(
                    'There is no such track',
                );
            }

            this.favourites.tracks.push(track);
        } else if (params.func === 'album') {
            console.log('params', params);
            const albumId = params.id;
            console.log(albumId);
            isIdValid(albumId);
            const album = await this.albumService.findOne(albumId);
            console.log('album', album);
            if (!album) {
                throw new UnprocessableEntityException(
                    'There is no such album',
                );
            }

            this.favourites.albums.push(album);
        } else if (params.func === 'artist') {
            console.log('params', params);
            const artistId = params.id;
            console.log(artistId);
            isIdValid(artistId);
            const artist = await this.artistService.findOne(artistId);
            console.log('artist', artist);
            if (!artist) {
                throw new UnprocessableEntityException(
                    'There is no such artist',
                );
            }

            this.favourites.artists.push(artist);
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
        }
    }
}
