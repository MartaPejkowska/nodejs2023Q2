import {
    Injectable,
    Inject,
    UnprocessableEntityException,
    NotFoundException,
} from '@nestjs/common';
import { FavouriteEntity } from './entities/favourite.entity';
import { isIdValid } from 'src/utils/isIdValid';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Injectable()
export class FavouritesService {
    @InjectRepository(FavouriteEntity)
    private readonly favouriteRepository: Repository<FavouriteEntity>;
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>;
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>;
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>;

    async create(params) {
        try {
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

                // this.favouriteRepository.save({ tracks: track });
                this.favouriteRepository.save({ tracks: trackId });
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

                // this.favouriteRepository.save({ albums: album });
                this.favouriteRepository.save({ albums: albumId });
                return `Succesfully added ${album.name} to favourites`;
            } else if (params.func === 'artist') {
                const artistId = params.id;
                isIdValid(artistId);

                const artist = await this.artistRepository.findOne({
                    where: { id: artistId },
                });

                // const artistToPush: DeepPartial<FavouriteEntity>={
                //     artists: artist
                // }

                if (!artist) {
                    throw new UnprocessableEntityException(
                        'There is no such artist',
                    );
                }

                // const favourites = await this.favouriteRepository.find();
                // console.log('favs', favourites);

                const artistToPush: DeepPartial<FavouriteEntity>[] =
                    await this.favouriteRepository.find({
                        select: {
                            artists: true,
                        },
                    });
                console.log(artistToPush);
                artistToPush.push(artistId);
                console.log(artistToPush);

                //  const artist2 = new FavouriteEntity();
                // artist2.artists = artistToPush;
                // this.favouriteRepository.save(artist2)
                // const artistToPush = favourites[0].artists;
                // console.log(favourites[0].artists);
                // favourites[0].artists = artist;
                // console.log(favourites[0].artists);
                // console.log('atp', artistToPush);

                // await this.favouriteRepository.save( artistToPush );

                return `Succesfully added ${artist.name} to favourites`;
            }
        } catch (err) {
            console.log(err);
        }
    }

    async findAll() {
        try {
            const favourites = await this.favouriteRepository.find();

            return favourites;
        } catch (err) {
            console.log(err);
        }
    }

    async remove(params) {
        //     if (params.func === 'track') {
        //         const trackId = params.id;
        //         isIdValid(trackId);
        //         const track = await this.trackRepository.findOne({
        //             where: { id: trackId },
        //         });
        //         if (!track) {
        //             throw new NotFoundException('Not found');
        //         }
        //         this.favouriteRepository[0].tracks.delete(track);
        //         return `Removed track with id: ${trackId}`;
        //     } else if (params.func === 'album') {
        //         const albumId = params.id;
        //         isIdValid(albumId);
        //         const album = await this.trackRepository.findOne({
        //             where: { id: albumId },
        //         });
        //         if (!album) {
        //             throw new NotFoundException('Not found');
        //         }
        //         this.favouriteRepository[0].albums.delete(album);
        //         return `Removed album with id: ${albumId}`;
        //     } else if (params.func === 'artist') {
        //         const artistId = params.id;
        //         isIdValid(artistId);
        //         const artist = await this.artistRepository.findOne({
        //             where: { id: artistId },
        //         });
        //         if (!artist) {
        //             throw new NotFoundException('Not found');
        //         }
        //         this.favouriteRepository[0].artists.delete(artist);
        //         return `Removed artist with id: ${artistId}`;
        //     }
        // }
    }
}
