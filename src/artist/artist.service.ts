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
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
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

        // if (
        //     typeof updateArtistDto.name !== 'string' ||
        //     typeof updateArtistDto.grammy !== 'boolean'
        // ) {
        //     throw new BadRequestException('Invalid data');
        // }
        const updatedArtist = { ...artist };
        if (updateArtistDto.name) {
            if (typeof updateArtistDto.name !== 'string') {
                throw new BadRequestException('Invalid data');
            }
        }
        if (updateArtistDto.grammy) {
            if (typeof updateArtistDto.grammy !== 'boolean') {
                throw new BadRequestException('Invalid data');
            }
        }


        updateArtistDto.name
            ? (updatedArtist.name = updateArtistDto.name)
            : (updatedArtist.name = updatedArtist.name);
        updatedArtist.grammy
            ? (updatedArtist.grammy = updateArtistDto.grammy)
            : (updatedArtist.grammy = updatedArtist.grammy);


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
        return `removed artist with id: ${id}`;
    }
}
