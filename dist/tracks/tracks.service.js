"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksService = void 0;
const common_1 = require("@nestjs/common");
const track_entity_1 = require("./entities/track.entity");
const isIdValid_1 = require("../utils/isIdValid");
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const artist_entity_1 = require("../artist/entities/artist.entity");
const album_entity_1 = require("../albums/entities/album.entity");
let TracksService = class TracksService {
    async create(createTrackDto) {
        const { name, artistId, albumId, duration } = createTrackDto;
        const track = {
            id: (0, uuid_1.v4)(),
            name,
            artistId,
            albumId,
            duration,
        };
        const artist = await this.artistRepository.findOne({
            where: { id: createTrackDto.artistId },
        });
        const album = await this.albumRepository.findOne({
            where: { id: createTrackDto.albumId },
        });
        if (!artist || !album) {
            throw new common_1.BadRequestException('No such artist or album');
        }
        if (typeof createTrackDto.name !== 'string' ||
            typeof createTrackDto.duration !== 'number' ||
            !createTrackDto.name ||
            !createTrackDto.duration) {
            throw new common_1.BadRequestException('Duration should be number, name should be a string');
        }
        await this.trackRepository.save(this.trackRepository.create(Object.assign({}, track)));
        return track;
    }
    async findAll() {
        const tracks = await this.trackRepository.find();
        return tracks;
    }
    async findOne(id) {
        (0, isIdValid_1.isIdValid)(id);
        const track = await this.trackRepository.findOne({
            where: { id: id },
        });
        console.log('track one', track);
        if (!track) {
            throw new common_1.NotFoundException('Track not found');
        }
        return track;
    }
    async update(id, updateTrackDto) {
        (0, isIdValid_1.isIdValid)(id);
        const track = await this.trackRepository.findOne({
            where: { id: id },
        });
        if (!track) {
            throw new common_1.NotFoundException('Track not found');
        }
        const updatedTrack = Object.assign({}, track);
        if (updateTrackDto.name) {
            if (typeof updateTrackDto.name !== 'string') {
                throw new common_1.BadRequestException('Name should be string');
            }
        }
        if (updateTrackDto.albumId) {
            if (typeof updateTrackDto.albumId !== 'string') {
                throw new common_1.BadRequestException('AlbumId should be string');
            }
        }
        if (updateTrackDto.artistId) {
            if (typeof updateTrackDto.artistId !== 'string') {
                throw new common_1.BadRequestException('ArtistId should be string');
            }
        }
        if (updateTrackDto.duration) {
            if (typeof updateTrackDto.duration !== 'number') {
                throw new common_1.BadRequestException('Duration should be number');
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
    async remove(id) {
        (0, isIdValid_1.isIdValid)(id);
        const track = await this.trackRepository.findOne({
            where: { id: id },
        });
        if (!track) {
            throw new common_1.NotFoundException('Track not found');
        }
        await this.trackRepository.remove(track);
        return `Removed track with id: ${id}`;
    }
};
__decorate([
    (0, typeorm_2.InjectRepository)(track_entity_1.TrackEntity),
    __metadata("design:type", typeorm_1.Repository)
], TracksService.prototype, "trackRepository", void 0);
__decorate([
    (0, typeorm_2.InjectRepository)(artist_entity_1.ArtistEntity),
    __metadata("design:type", typeorm_1.Repository)
], TracksService.prototype, "artistRepository", void 0);
__decorate([
    (0, typeorm_2.InjectRepository)(album_entity_1.AlbumEntity),
    __metadata("design:type", typeorm_1.Repository)
], TracksService.prototype, "albumRepository", void 0);
TracksService = __decorate([
    (0, common_1.Injectable)()
], TracksService);
exports.TracksService = TracksService;
//# sourceMappingURL=tracks.service.js.map