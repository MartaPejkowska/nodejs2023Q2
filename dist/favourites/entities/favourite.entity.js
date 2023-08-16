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
exports.AlbumFav = exports.ArtistFav = exports.TrackFav = exports.FavouriteEntity = void 0;
const album_entity_1 = require("../../albums/entities/album.entity");
const artist_entity_1 = require("../../artist/entities/artist.entity");
const track_entity_1 = require("../../tracks/entities/track.entity");
const typeorm_1 = require("typeorm");
class FavouriteEntity {
}
exports.FavouriteEntity = FavouriteEntity;
let TrackFav = class TrackFav {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], TrackFav.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TrackFav.prototype, "trackId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => track_entity_1.TrackEntity, { onDelete: 'SET NULL', eager: true }),
    __metadata("design:type", track_entity_1.TrackEntity)
], TrackFav.prototype, "track", void 0);
TrackFav = __decorate([
    (0, typeorm_1.Entity)('track-fav')
], TrackFav);
exports.TrackFav = TrackFav;
let ArtistFav = class ArtistFav {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], ArtistFav.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ArtistFav.prototype, "artistId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => artist_entity_1.ArtistEntity, { onDelete: 'SET NULL', eager: true }),
    __metadata("design:type", artist_entity_1.ArtistEntity)
], ArtistFav.prototype, "artist", void 0);
ArtistFav = __decorate([
    (0, typeorm_1.Entity)('artist-fav')
], ArtistFav);
exports.ArtistFav = ArtistFav;
let AlbumFav = class AlbumFav {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], AlbumFav.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AlbumFav.prototype, "albumId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => album_entity_1.AlbumEntity, { onDelete: 'SET NULL', eager: true }),
    __metadata("design:type", album_entity_1.AlbumEntity)
], AlbumFav.prototype, "album", void 0);
AlbumFav = __decorate([
    (0, typeorm_1.Entity)('album-fav')
], AlbumFav);
exports.AlbumFav = AlbumFav;
//# sourceMappingURL=favourite.entity.js.map