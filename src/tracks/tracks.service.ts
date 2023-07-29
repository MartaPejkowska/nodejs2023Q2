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

@Injectable()
export class TracksService {
    tracks: TrackEntity[] = tracks;
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

        this.tracks.push(track);
        return track;
    }

    findAll(): TrackEntity[] {
        return this.tracks;
    }

    async findOne(id: string) {
        isIdValid(id);
        const track = await this.tracks.find((track) => track.id === id);
        if (!track) {
            throw new NotFoundException('Not found');
        }
        return track;
    }

    async update(id: string, updateTrackDto: UpdateTrackDto) {
        isIdValid(id);
        const trackIndex = await this.tracks.findIndex(
            (track) => track.id === id,
        );
        const track = this.tracks[trackIndex];

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

        this.tracks[trackIndex] = updatedTrack;
        return this.tracks[trackIndex];
    }

    async remove(id: string) {
        isIdValid(id);
        const trackIndex = await this.tracks.findIndex(
            (track) => track.id === id,
        );
        if (trackIndex === -1) {
            throw new NotFoundException('Not found');
        }
        this.tracks.splice(trackIndex, 1);
        return `Removed track with id: ${id}`;
    }
}
