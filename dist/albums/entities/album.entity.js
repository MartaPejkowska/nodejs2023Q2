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
exports.AlbumEntity = void 0;
const artist_entity_1 = require("../../artist/entities/artist.entity");
const typeorm_1 = require("typeorm");
let AlbumEntity = class AlbumEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AlbumEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AlbumEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AlbumEntity.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AlbumEntity.prototype, "artistId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => artist_entity_1.ArtistEntity, (artist) => artist.id, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.ManyToOne)(() => artist_entity_1.ArtistEntity),
    (0, typeorm_1.JoinColumn)({ name: 'artistId' }),
    __metadata("design:type", artist_entity_1.ArtistEntity)
], AlbumEntity.prototype, "artist", void 0);
AlbumEntity = __decorate([
    (0, typeorm_1.Entity)()
], AlbumEntity);
exports.AlbumEntity = AlbumEntity;
//# sourceMappingURL=album.entity.js.map