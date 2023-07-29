import {
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Inject,
    HttpCode
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistService } from 'src/artist/artist.service';

interface paramsDTO {
    func: string;
    id: string;
}

@Controller('favs')
export class FavouritesController {
    constructor(
        private readonly favouritesService: FavouritesService,
        // private readonly albumService: AlbumsService,
        // private readonly artistService: ArtistService,
    ) {}


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
