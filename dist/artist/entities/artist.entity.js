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
exports.ArtistEntity = void 0;
const typeorm_1 = require("typeorm");
const track_entity_1 = require("../../tracks/entities/track.entity");
const album_entity_1 = require("../../albums/entities/album.entity");
let ArtistEntity = class ArtistEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ArtistEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ArtistEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ArtistEntity.prototype, "grammy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => track_entity_1.TrackEntity, (track) => track.artist, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], ArtistEntity.prototype, "tracks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => album_entity_1.AlbumEntity, (album) => album.artist, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], ArtistEntity.prototype, "albums", void 0);
ArtistEntity = __decorate([
    (0, typeorm_1.Entity)()
], ArtistEntity);
exports.ArtistEntity = ArtistEntity;
//# sourceMappingURL=artist.entity.js.map