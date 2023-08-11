import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavouriteEntity } from 'src/favourites/entities/favourite.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid v4

    @Column()
    name: string;

    @Column()
    year: number;

    @Column({ nullable: true })
    artistId: string | null; // refers to Artist

    @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
        onDelete: 'SET NULL',
        // nullable: true,
    })
    artist: ArtistEntity;

    @OneToMany(() => TrackEntity, (track) => track.album, {
        cascade: true,
        // eager: true,
    })
    tracks: TrackEntity[];

    // @OneToMany(() => FavouriteEntity, (favourite) => favourite.albums, {
    //     cascade: true,
    //     nullable: true,
    // })
    // favourites: FavouriteEntity[];
}
