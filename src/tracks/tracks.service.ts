import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { tracks } from 'src/db/database';
import { isIdValid } from 'src/utils/isIdValid';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TracksService {
    // tracks: TrackEntity[] = tracks;
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>;
    create(createTrackDto: CreateTrackDto) {
        const { name, artistId, albumId, duration } = createTrackDto;
        const track = {
            id: uuidv4(),
            name,
            artistId,
            albumId,
            duration,
        };

        if (
            typeof createTrackDto.name !== 'string' ||
            // typeof createTrackDto.albumId !== 'string' ||
            // typeof createTrackDto.artistId !== 'string' ||
            typeof createTrackDto.duration !== 'number' ||
            !createTrackDto.name ||
            !createTrackDto.duration
        ) {
            throw new BadRequestException('Duration should be number');
        }

        this.trackRepository.save(track);
        return track;
    }

    async findAll(): Promise<TrackEntity[]> {
        const tracks = await this.trackRepository.find();
        return tracks;
    }

    async findOne(id: string) {
        isIdValid(id);
        const track = await this.trackRepository.findOne({ where: { id: id } });
        if (!track) {
            throw new NotFoundException('Not found');
        }
        return track;
    }

    async update(id: string, updateTrackDto: UpdateTrackDto) {
        isIdValid(id);
        const track = await this.trackRepository.findOne({ where: { id: id } });

        if (!track) {
            throw new NotFoundException('Not found');
        }

        const updatedTrack = { ...track };
        if (updateTrackDto.name) {
            if (typeof updateTrackDto.name !== 'string') {
                throw new BadRequestException('Name should be string');
            }
        }
        if (updateTrackDto.albumId) {
            if (typeof updateTrackDto.albumId !== 'string') {
                throw new BadRequestException('AlbumId should be string');
            }
        }
        if (updateTrackDto.artistId) {
            if (typeof updateTrackDto.artistId !== 'string') {
                throw new BadRequestException('ArtistId should be string');
            }
        }
        if (updateTrackDto.duration) {
            if (typeof updateTrackDto.duration !== 'number') {
                throw new BadRequestException('Duration should be number');
            }
        }

        updatedTrack.name = updateTrackDto.name || updatedTrack.name;
        updatedTrack.artistId =
            updateTrackDto.artistId || updatedTrack.artistId;
        updatedTrack.albumId = updateTrackDto.albumId || updatedTrack.albumId;
        updatedTrack.duration =
            updateTrackDto.duration || updatedTrack.duration;

        this.trackRepository.save(updatedTrack);
        return updatedTrack;
    }

    async remove(id: string) {
        isIdValid(id);
        const track = await this.trackRepository.findOne({
            where: { id: id },
        });
        if (!track) {
            throw new NotFoundException('Not found');
        }
        this.trackRepository.delete(track);
        return `Removed track with id: ${id}`;
    }
}
