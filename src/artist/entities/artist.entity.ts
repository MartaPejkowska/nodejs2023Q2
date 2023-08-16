import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { FavouriteEntity } from 'src/favourites/entities/favourite.entity';

@Entity()
export class ArtistEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid v4

    @Column()
    name: string;

    @Column()
    grammy: boolean;

    @OneToMany(() => TrackEntity, (track) => track.artist, {
        cascade: true,
        // eager: true,
        // nullable: true,
    })
    tracks: TrackEntity[];

    @OneToMany(() => AlbumEntity, (album) => album.artist, {
        cascade: true,
        // eager: true,
        // nullable: true,
    })
    albums: AlbumEntity[];

    // @OneToMany(() => FavouriteEntity, (favourite) => favourite.artists, {
    //     cascade: true,
    //     nullable: true,
    // })
    // favourites: FavouriteEntity[];
}
