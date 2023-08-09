import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavouriteEntity } from 'src/favourites/entities/favourite.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';

@Entity()
export class TrackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid v4

    @Column()
    name: string;

    @Column({ nullable: true })
    artistId: string | null; // refers to Artist

    @Column({ nullable: true })
    albumId: string | null; // refers to Album

    @Column()
    duration: number; // integer number

    @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
        onDelete: 'SET NULL',
    })
    album: AlbumEntity;

    @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
        onDelete: 'SET NULL',
    })
    artist: ArtistEntity;

    @OneToMany(() => FavouriteEntity, (favourite) => favourite.tracks, {
        cascade: true,
        nullable: true,
    })
    favourites: FavouriteEntity[];
}
