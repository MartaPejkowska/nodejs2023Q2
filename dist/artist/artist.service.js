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
exports.ArtistService = void 0;
const common_1 = require("@nestjs/common");
const artist_entity_1 = require("./entities/artist.entity");
const uuid_1 = require("uuid");
const isIdValid_1 = require("../utils/isIdValid");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const track_entity_1 = require("../tracks/entities/track.entity");
const album_entity_1 = require("../albums/entities/album.entity");
let ArtistService = class ArtistService {
    async create(createArtistDto) {
        const { name, grammy } = createArtistDto;
        if (!name ||
            !grammy ||
            typeof name !== 'string' ||
            typeof grammy !== 'boolean') {
            throw new common_1.BadRequestException('Invalid data');
        }
        const artist = {
            id: (0, uuid_1.v4)(),
            name: name,
            grammy: grammy,
        };
        await this.artistRepository.save(artist);
        return artist;
    }
    async findAll() {
        const artists = await this.artistRepository.find();
        return artists;
    }
    async findOne(id) {
        (0, isIdValid_1.isIdValid)(id);
        const artist = await this.artistRepository.findOne({
            where: { id: id },
        });
        if (!artist) {
            throw new common_1.NotFoundException('Not found');
        }
        return artist;
    }
    async update(id, updateArtistDto) {
        (0, isIdValid_1.isIdValid)(id);
        const artist = await this.artistRepository.findOne({
            where: { id: id },
        });
        if (!artist) {
            throw new common_1.NotFoundException('Not found');
        }
        const updatedArtist = Object.assign({}, artist);
        if (updateArtistDto.name) {
            if (typeof updateArtistDto.name !== 'string') {
                throw new common_1.BadRequestException('Invalid data');
            }
        }
        if (updateArtistDto.grammy) {
            if (typeof updateArtistDto.grammy !== 'boolean') {
                throw new common_1.BadRequestException('Invalid data');
            }
        }
        updateArtistDto.name
            ? (updatedArtist.name = updateArtistDto.name)
            : (updatedArtist.name = updatedArtist.name);
        updatedArtist.grammy
            ? (updatedArtist.grammy = updateArtistDto.grammy)
            : (updatedArtist.grammy = updatedArtist.grammy);
        await this.artistRepository.save(updatedArtist);
        return updatedArtist;
    }
    async remove(id) {
        (0, isIdValid_1.isIdValid)(id);
        const artist = await this.artistRepository.findOne({
            where: { id: id },
        });
        if (!artist) {
            throw new common_1.NotFoundException('Not found');
        }
        await this.albumRepository.update({ artistId: id }, { artistId: null });
        await this.trackRepository.update({ artistId: id }, { artistId: null });
        await this.artistRepository.delete(artist);
        return `removed artist with id: ${id}`;
    }
};
__decorate([
    (0, typeorm_2.InjectRepository)(artist_entity_1.ArtistEntity),
    __metadata("design:type", typeorm_1.Repository)
], ArtistService.prototype, "artistRepository", void 0);
__decorate([
    (0, typeorm_2.InjectRepository)(track_entity_1.TrackEntity),
    __metadata("design:type", typeorm_1.Repository)
], ArtistService.prototype, "trackRepository", void 0);
__decorate([
    (0, typeorm_2.InjectRepository)(album_entity_1.AlbumEntity),
    __metadata("design:type", typeorm_1.Repository)
], ArtistService.prototype, "albumRepository", void 0);
ArtistService = __decorate([
    (0, common_1.Injectable)()
], ArtistService);
exports.ArtistService = ArtistService;
//# sourceMappingURL=artist.service.js.map