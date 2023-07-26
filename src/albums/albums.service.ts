import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { albums } from 'src/db/database';
import { v4 as uuidv4 } from 'uuid';
import { isIdValid } from 'src/utils/isIdValid';

@Injectable()
export class AlbumsService {
  albums: AlbumEntity[] = albums;
  create(createAlbumDto: CreateAlbumDto) {
    const artistId = createAlbumDto.artistId;
    // const artist = artists.find((artist) => artist.id === artistId);
    const album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    albums.push(album);
  }

  findAll() {
    return this.albums;
  }

  async findOne(id: string) {
    isIdValid(id);
    const album = await albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    isIdValid(id);
    const albumIndex = await this.albums.findIndex((album) => album.id === id);
    const album = this.albums[albumIndex];

    if (!album) {
      throw new NotFoundException('Not found');
    }

    const updatedAlbum = { ...album };

    updatedAlbum.name = updateAlbumDto.name;
    updatedAlbum.year = updateAlbumDto.year;
    updateAlbumDto.artistId = updateAlbumDto.artistId;

    this.albums[albumIndex] = updatedAlbum;
    return this.albums[albumIndex];
  }

  async remove(id: string) {
    isIdValid(id);
    const albumIndex = await this.albums.findIndex((album) => album.id === id);
    console.log(albumIndex);
    if (albumIndex === -1) {
      throw new NotFoundException('Not found');
    }
    this.albums.splice(albumIndex, 1);
    return `removed album with id: ${id}`;
  }
}
