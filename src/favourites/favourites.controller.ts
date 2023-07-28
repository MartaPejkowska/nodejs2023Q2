import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';

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
    @Delete('track/:id')
    remove(@Param('id') id: string) {
        return this.favouritesService.remove(id);
    }
    // @Post('album/:id')
    // create(@Body() createFavouriteDto: CreateFavouriteDto) {
    //   return this.favouritesService.create(createFavouriteDto);
    // }
    // @Delete('album/:id')
    // remove(@Param('id') id: string) {
    //   return this.favouritesService.remove(id);
    // }
    // @Post('artist/:id')
    // create(@Body() createFavouriteDto: CreateFavouriteDto) {
    //   return this.favouritesService.create(createFavouriteDto);
    // }
    // @Delete('artist/:id')
    // remove(@Param('id') id: string) {
    //   return this.favouritesService.remove(id);
    // }
}
