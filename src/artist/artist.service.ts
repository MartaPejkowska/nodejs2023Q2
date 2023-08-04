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
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
    // artists: ArtistEntity[] = artists;
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>;
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
        this.artistRepository.save(artist);
        return artist;
    }

    async findAll(): Promise<ArtistEntity[]> {
        const artists = await this.artistRepository.find();
        return artists;
    }

    async findOne(id: string) {
        isIdValid(id);
        const artist = await this.artistRepository.findOne({
            where: { id: id },
        });
        if (!artist) {
            throw new NotFoundException('Not found');
        }
        return artist;
    }

    async update(id: string, updateArtistDto: UpdateArtistDto) {
        isIdValid(id);
        const artist = await this.artistRepository.findOne({
            where: { id: id },
        });

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

        this.artistRepository.save(updatedArtist);
        return updatedArtist;
    }

    async remove(id: string) {
        isIdValid(id);
        const artist = await this.artistRepository.findOne({
            where: { id: id },
        });
        if (!artist) {
            throw new NotFoundException('Not found');
        }
        this.artistRepository.remove(artist);
        // console.log('track przed', tracks);
        // const trackWithArtist = [];
        // const albumWithArtist = [];
        // tracks.map((track) => {
        //     if (track.artistId === id) {
        //         trackWithArtist.push(track);
        //     }
        // });
        // albums.map((album) => {
        //     if (album.artistId === id) {
        //         albumWithArtist.push(album);
        //     }
        // });
        // trackWithArtist.map((track) => (track.artistId = null));
        // albumWithArtist.map((album) => (album.artistId = null));

        // console.log('tracks po artist', tracks);
        return `removed artist with id: ${id}`;
    }
}
