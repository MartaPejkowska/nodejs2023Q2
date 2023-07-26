import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { isIdValid } from 'src/utils/isIdValid';

// const regexExp =
//   /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

@Injectable()
export class ArtistService {
  artists: ArtistEntity[] = [];
  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const artist = {
      id: uuidv4(),
      name: name,
      grammy: grammy,
    };
    this.artists.push(artist);
    return artist;
  }

  findAll(): ArtistEntity[] {
    return this.artists;
  }

  async findOne(id: string) {
    // if (!regexExp.test(id)) {
    //   throw new BadRequestException('Not valid id');
    // }
    isIdValid(id);
    const artist = await this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    // if (!regexExp.test(id)) {
    //   throw new BadRequestException('Not valid id');
    // }
    isIdValid(id);
    const artistIndex = await this.artists.findIndex(
      (artist) => artist.id === id,
    );
    const artist = this.artists[artistIndex];

    if (!artist) {
      throw new NotFoundException('Not found');
    }

    const updatedArtist = { ...artist };

    updatedArtist.name = updateArtistDto.name;
    updatedArtist.grammy = updateArtistDto.grammy;

    this.artists[artistIndex] = updatedArtist;
    return this.artists[artistIndex];
  }

  async remove(id: string) {
    // if (!regexExp.test(id)) {
    //   throw new BadRequestException('Not valid id');
    // }
    console.log(id)
    // isIdValid(id);
    const artistIndex = await this.artists.findIndex(
      (artist) => artist.id === id,
    );
    console.log(artistIndex)
    if (!artistIndex) {
      throw new NotFoundException('Not found');
    }
    this.artists.splice(artistIndex, 1);
  }
}
