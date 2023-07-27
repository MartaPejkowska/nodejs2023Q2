import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { FavouriteEntity } from './entities/favourite.entity';
import { favourites } from 'src/db/database';

@Injectable()
export class FavouritesService {
  favourites: FavouriteEntity[] = favourites
  create(createFavouriteDto: CreateFavouriteDto) {
    // if(createFavouriteDto === trackId)
    // this.favourites.artists.push()
  }

  findAll() {
    return this.favourites;
  }

  remove(id: string) {
    return `This action removes a #${id} favourite`;
  }
}
