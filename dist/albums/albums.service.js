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
exports.AlbumsService = void 0;
const common_1 = require("@nestjs/common");
const album_entity_1 = require("./entities/album.entity");
const uuid_1 = require("uuid");
const isIdValid_1 = require("../utils/isIdValid");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const artist_entity_1 = require("../artist/entities/artist.entity");
let AlbumsService = class AlbumsService {
    async create(createAlbumDto) {
        const name = createAlbumDto.name;
        const year = createAlbumDto.year;
        const artistId = createAlbumDto.artistId;
        if (artistId !== null) {
            (0, isIdValid_1.isIdValid)(artistId);
        }
        const artist = await this.artistRepository.findOne({
            where: {
                id: createAlbumDto.artistId,
            },
        });
        if (!artist) {
            throw new common_1.BadRequestException('There is no such artist');
        }
        if (!name ||
            !year) {
            throw new common_1.BadRequestException('Wrong data');
        }
        const album = {
            id: (0, uuid_1.v4)(),
            name: name,
            year: year,
            artistId: artistId,
        };
        this.albumRepository.save(this.albumRepository.create(Object.assign({}, album)));
        console.log('create album', album);
        return album;
    }
    async findAll() {
        const albums = await this.albumRepository.find();
        return albums;
    }
    async findOne(id) {
        (0, isIdValid_1.isIdValid)(id);
        const album = await this.albumRepository.findOne({
            where: { id: id },
        });
        console.log('album one', album);
        if (!album) {
            throw new common_1.NotFoundException('Not found');
        }
        return album;
    }
    async update(id, updateAlbumDto) {
        (0, isIdValid_1.isIdValid)(id);
        const album = await this.albumRepository.findOne({
            where: { id: id },
        });
        if (!album) {
            throw new common_1.NotFoundException('Not found');
        }
        const { name, year, artistId } = updateAlbumDto;
        const updatedAlbum = Object.assign({}, album);
        if (updateAlbumDto.name) {
            if (typeof name !== 'string') {
                throw new common_1.BadRequestException('Name should be a atring');
            }
        }
        if (updateAlbumDto.year) {
            if (typeof year !== 'number') {
                throw new common_1.BadRequestException('Year should be a number');
            }
        }
        if (updateAlbumDto.artistId) {
            if (typeof artistId !== 'string') {
                throw new common_1.BadRequestException('ArtistId should be a string or null');
            }
        }
        updatedAlbum.name = updateAlbumDto.name || updatedAlbum.name;
        updatedAlbum.year = updateAlbumDto.year || updatedAlbum.year;
        updatedAlbum.artistId =
            updateAlbumDto.artistId || updatedAlbum.artistId;
        this.albumRepository.save(updatedAlbum);
        return updatedAlbum;
    }
    async remove(id) {
        (0, isIdValid_1.isIdValid)(id);
        const album = await this.albumRepository.findOne({ where: { id: id } });
        if (!album) {
            throw new common_1.NotFoundException('Not found');
        }
        this.albumRepository.delete(album);
        return `removed album with id: ${id}`;
    }
};
__decorate([
    (0, typeorm_2.InjectRepository)(album_entity_1.AlbumEntity),
    __metadata("design:type", typeorm_1.Repository)
], AlbumsService.prototype, "albumRepository", void 0);
__decorate([
    (0, typeorm_2.InjectRepository)(artist_entity_1.ArtistEntity),
    __metadata("design:type", typeorm_1.Repository)
], AlbumsService.prototype, "artistRepository", void 0);
AlbumsService = __decorate([
    (0, common_1.Injectable)()
], AlbumsService);
exports.AlbumsService = AlbumsService;
//# sourceMappingURL=albums.service.js.map