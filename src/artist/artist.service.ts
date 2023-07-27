import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { isIdValid } from 'src/utils/isIdValid';
import { albums, artists } from 'src/db/database';
import { tracks } from 'src/db/database';

@Injectable()
export class ArtistService {
    artists: ArtistEntity[] = artists;
    create(createArtistDto: CreateArtistDto) {
        const { name, grammy } = createArtistDto;

        if (
            !name ||
            !grammy ||
            typeof name !== 'string' ||
            typeof grammy !== 'boolean'
        ) {
            throw new BadRequestException('Invalid data');
        }

        const artist = {
            id: uuidv4(),
            name: name,
            grammy: grammy,
        };
        this.artists.push(artist);
        return artist;
    }

    findAll(): ArtistEntity[] {
        return this.artists;
    }

    async findOne(id: string) {
        isIdValid(id);
        const artist = await this.artists.find((artist) => artist.id === id);
        if (!artist) {
            throw new NotFoundException('Not found');
        }
        return artist;
    }

    async update(id: string, updateArtistDto: UpdateArtistDto) {
        isIdValid(id);
        const artistIndex = await this.artists.findIndex(
            (artist) => artist.id === id,
        );
        const artist = this.artists[artistIndex];

        if (!artist) {
            throw new NotFoundException('Not found');
        }

        if (
            typeof updateArtistDto.name !== 'string' ||
            typeof updateArtistDto.grammy !== 'boolean'
        ) {
            throw new BadRequestException('Invalid data');
        }
        const updatedArtist = { ...artist };

        updatedArtist.name = updateArtistDto.name;
        updatedArtist.grammy = updateArtistDto.grammy;

        this.artists[artistIndex] = updatedArtist;
        return this.artists[artistIndex];
    }

    async remove(id: string) {
        isIdValid(id);
        const artistIndex = await this.artists.findIndex(
            (artist) => artist.id === id,
        );
        if (artistIndex === -1) {
            throw new NotFoundException('Not found');
        }
        this.artists.splice(artistIndex, 1);
        console.log('track przed', tracks);
        const trackWithArtist = [];
        const albumWithArtist = [];
        tracks.map((track) => {
            if (track.artistId === id) {
                trackWithArtist.push(track);
            }
        });
        albums.map((album) => {
            if (album.artistId === id) {
                albumWithArtist.push(album);
            }
        });
        trackWithArtist.map((track) => (track.artistId = null));
        albumWithArtist.map((album) => (album.artistId = null));

        console.log('tracks po artist', tracks);
        return `removed artist with id: ${id}`;
    }
}
