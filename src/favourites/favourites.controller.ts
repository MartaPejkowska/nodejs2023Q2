import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavouritesService } from './favourites.service';

interface paramsDTO {
    func: string;
    id: string;
}

@Controller('favs')
export class FavouritesController {
    constructor(private readonly favouritesService: FavouritesService) {}

    @Get()
    findAll() {
        return this.favouritesService.findAll();
    }

    @Post(':func/:id')
    create(@Param() params: paramsDTO) {
        return this.favouritesService.create(params);
    }

    @Delete(':func/:id')
    @HttpCode(204)
    remove(@Param() params: paramsDTO) {
        return this.favouritesService.remove(params);
    }
}
