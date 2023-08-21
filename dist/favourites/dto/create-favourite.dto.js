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
exports.CreateFavouriteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateFavouriteDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'f394fa38-9322-47d1-9c1e-6e18c5df3291' }),
    __metadata("design:type", String)
], CreateFavouriteDto.prototype, "trackId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a4b6a8f4-8392-4331-bf99-10f7c39d5772' }),
    __metadata("design:type", String)
], CreateFavouriteDto.prototype, "albumId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1197d507-8f1d-47e6-805a-7679b9cd19ab' }),
    __metadata("design:type", String)
], CreateFavouriteDto.prototype, "artistId", void 0);
exports.CreateFavouriteDto = CreateFavouriteDto;
//# sourceMappingURL=create-favourite.dto.js.map