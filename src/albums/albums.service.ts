import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { albums } from 'src/db/database';
import { v4 as uuidv4 } from 'uuid';
import { isIdValid } from 'src/utils/isIdValid';
import { tracks } from 'src/db/database';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumsService {
    // albums: AlbumEntity[] = albums;
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>;
    create(createAlbumDto: CreateAlbumDto) {
        const name = createAlbumDto.name;
        const year = createAlbumDto.year;
        const artistId = createAlbumDto.artistId;

        if (
            // typeof name !== 'string' ||
            // typeof year !== 'number' ||
            // typeof artistId !== 'string' ||
            !name ||
            !year
        ) {
            throw new BadRequestException('Wrong data');
        }
        const album = {
            id: uuidv4(),
            name: name,
            year: year,
            artistId: artistId,
        };
        this.albumRepository.save(album);
        return album;
    }

    async findAll() {
        const albums = await this.albumRepository.find();
        return albums;
    }

    async findOne(id: string) {
        isIdValid(id);
        const album = await this.albumRepository.findOne({ where: { id: id } });

        if (!album) {
            throw new NotFoundException('Not found');
        }
        return album;
    }

    async update(id: string, updateAlbumDto: UpdateAlbumDto) {
        console.log('in update');
        isIdValid(id);
        const album = await this.albumRepository.findOne({ where: { id: id } });

        if (!album) {
            throw new NotFoundException('Not found');
        }
        const { name, year, artistId } = updateAlbumDto;

        const updatedAlbum = { ...album };
        if (updateAlbumDto.name) {
            if (typeof name !== 'string') {
                throw new BadRequestException('Name should be a atring');
            }
        }
        if (updateAlbumDto.year) {
            if (typeof year !== 'number') {
                throw new BadRequestException('Year should be a number');
            }
        }
        if (updateAlbumDto.artistId) {
            if (typeof artistId !== 'string') {
                throw new BadRequestException(
                    'ArtistId should be a string or null',
                );
            }
        }

        updatedAlbum.name = updateAlbumDto.name || updatedAlbum.name;
        updatedAlbum.year = updateAlbumDto.year || updatedAlbum.year;
        updatedAlbum.artistId =
            updateAlbumDto.artistId || updatedAlbum.artistId;

        this.albumRepository.save(updatedAlbum);
        return updatedAlbum;
    }

    async remove(id: string) {
        isIdValid(id);
        const album = await this.albumRepository.findOne({ where: { id: id } });

        if (!album) {
            throw new NotFoundException('Not found');
        }

        // const trackWithAlbum = [];
        // tracks.map((track) => {
        //     if (track.albumId === id) {
        //         trackWithAlbum.push(track);
        //     }
        // });
        // trackWithAlbum.map((track) => (track.albumId = null));
        this.albumRepository.delete(album);

        return `removed album with id: ${id}`;
    }
}
