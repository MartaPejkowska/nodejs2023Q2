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
exports.FavouritesController = void 0;
const common_1 = require("@nestjs/common");
const favourites_service_1 = require("./favourites.service");
let FavouritesController = class FavouritesController {
    constructor(favouritesService) {
        this.favouritesService = favouritesService;
    }
    findAll() {
        return this.favouritesService.findAll();
    }
    create(params) {
        return this.favouritesService.create(params);
    }
    remove(params) {
        return this.favouritesService.remove(params);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FavouritesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':func/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FavouritesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':func/:id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FavouritesController.prototype, "remove", null);
FavouritesController = __decorate([
    (0, common_1.Controller)('favs'),
    __metadata("design:paramtypes", [favourites_service_1.FavouritesService])
], FavouritesController);
exports.FavouritesController = FavouritesController;
//# sourceMappingURL=favourites.controller.js.map