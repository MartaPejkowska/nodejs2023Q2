"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritesModule = void 0;
const common_1 = require("@nestjs/common");
const favourites_controller_1 = require("./favourites.controller");
const typeorm_1 = require("@nestjs/typeorm");
const album_entity_1 = require("../albums/entities/album.entity");
const artist_entity_1 = require("../artist/entities/artist.entity");
const track_entity_1 = require("../tracks/entities/track.entity");
const favourite_entity_1 = require("./entities/favourite.entity");
const favourites_service_1 = require("./favourites.service");
const albums_module_1 = require("../albums/albums.module");
const tracks_module_1 = require("../tracks/tracks.module");
const artist_module_1 = require("../artist/artist.module");
let FavouritesModule = class FavouritesModule {
};
FavouritesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            artist_module_1.ArtistModule,
            albums_module_1.AlbumsModule,
            tracks_module_1.TracksModule,
            typeorm_1.TypeOrmModule.forFeature([
                favourite_entity_1.FavouriteEntity,
                track_entity_1.TrackEntity,
                album_entity_1.AlbumEntity,
                artist_entity_1.ArtistEntity,
                favourite_entity_1.TrackFav,
                favourite_entity_1.AlbumFav,
                favourite_entity_1.ArtistFav,
            ]),
        ],
        controllers: [favourites_controller_1.FavouritesController],
        providers: [favourites_service_1.FavouritesService],
    })
], FavouritesModule);
exports.FavouritesModule = FavouritesModule;
//# sourceMappingURL=favourites.module.js.map