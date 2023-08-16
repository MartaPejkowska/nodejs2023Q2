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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritesService = void 0;
const common_1 = require("@nestjs/common");
const isIdValid_1 = require("../utils/isIdValid");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const track_entity_1 = require("../tracks/entities/track.entity");
const album_entity_1 = require("../albums/entities/album.entity");
const artist_entity_1 = require("../artist/entities/artist.entity");
const favourite_entity_1 = require("./entities/favourite.entity");
let FavouritesService = class FavouritesService {
    constructor(artistFavRepository, artistRepository, trackFavRepository, trackRepository, albumFavRepository, albumRepository) {
        this.artistFavRepository = artistFavRepository;
        this.artistRepository = artistRepository;
        this.trackFavRepository = trackFavRepository;
        this.trackRepository = trackRepository;
        this.albumFavRepository = albumFavRepository;
        this.albumRepository = albumRepository;
    }
    async create(params) {
        if (params.func === 'track') {
            const trackId = params.id;
            (0, isIdValid_1.isIdValid)(trackId);
            const track = await this.trackRepository.findOne({
                where: { id: trackId },
            });
            if (!track) {
                throw new common_1.UnprocessableEntityException('There is no such track');
            }
            this.trackFavRepository.save({ trackId: trackId });
            return `Succesfully added ${track.name} to favourites`;
        }
        else if (params.func === 'album') {
            const albumId = params.id;
            (0, isIdValid_1.isIdValid)(albumId);
            const album = await this.albumRepository.findOne({
                where: { id: albumId },
            });
            if (!album) {
                throw new common_1.UnprocessableEntityException('There is no such album');
            }
            this.albumFavRepository.save({ albumId: albumId });
            return `Succesfully added ${album.name} to favourites`;
        }
        else if (params.func === 'artist') {
            const artistId = params.id;
            (0, isIdValid_1.isIdValid)(artistId);
            const artist = await this.artistRepository.findOne({
                where: { id: artistId },
            });
            if (!artist) {
                throw new common_1.UnprocessableEntityException('There is no such artist');
            }
            this.artistFavRepository.save({ artistId: artistId });
            return `Succesfully added ${artist.name} to favourites`;
        }
    }
    async findAll() {
        const artistFavs = await this.artistFavRepository.find({
            relations: { artist: true },
        });
        const albumFavs = await this.albumFavRepository.find({
            relations: { album: true },
        });
        const trackFavs = await this.trackFavRepository.find({
            relations: { track: true },
        });
        const artists = artistFavs.map((artistFav) => artistFav.artist);
        const albums = albumFavs.map((albumFav) => albumFav.album);
        const tracks = trackFavs.map((trackFav) => trackFav.track);
        return { artists, albums, tracks };
    }
    async remove(params) {
        if (params.func === 'track') {
            const trackId = params.id;
            (0, isIdValid_1.isIdValid)(trackId);
            const track = await this.trackRepository.findOne({
                where: { id: trackId },
            });
            if (!track) {
                throw new common_1.UnprocessableEntityException('There is no such track');
            }
            this.trackFavRepository.delete({ trackId: trackId });
            return `Succesfully removed ${track.name} from favourites`;
        }
        else if (params.func === 'album') {
            const albumId = params.id;
            (0, isIdValid_1.isIdValid)(albumId);
            const album = await this.albumRepository.findOne({
                where: { id: albumId },
            });
            if (!album) {
                throw new common_1.UnprocessableEntityException('There is no such album');
            }
            this.albumFavRepository.delete({ albumId: albumId });
            return `Succesfully removed ${album.name} from favourites`;
        }
        else if (params.func === 'artist') {
            const artistId = params.id;
            (0, isIdValid_1.isIdValid)(artistId);
            const artist = await this.artistRepository.findOne({
                where: { id: artistId },
            });
            if (!artist) {
                throw new common_1.UnprocessableEntityException('There is no such artist');
            }
            this.artistFavRepository.delete({ artistId: artistId });
            return `Succesfully removed ${artist.name} from favourites`;
        }
    }
};
FavouritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(favourite_entity_1.ArtistFav)),
    __param(1, (0, typeorm_2.InjectRepository)(artist_entity_1.ArtistEntity)),
    __param(2, (0, typeorm_2.InjectRepository)(favourite_entity_1.TrackFav)),
    __param(3, (0, typeorm_2.InjectRepository)(track_entity_1.TrackEntity)),
    __param(4, (0, typeorm_2.InjectRepository)(favourite_entity_1.AlbumFav)),
    __param(5, (0, typeorm_2.InjectRepository)(album_entity_1.AlbumEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], FavouritesService);
exports.FavouritesService = FavouritesService;
//# sourceMappingURL=favourites.service.js.map