import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
    Entity,
    Column,
    ManyToOne,
    PrimaryColumn,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FavouriteEntity {
    // @PrimaryColumn({ type:'jsonb', array: false,  default: [] })
    // artists?: ArtistEntity[];

    // @Column('int', { array: true, nullable: true, default: [] })
    // albums?: AlbumEntity;

    // @Column('int', { array: true, nullable: true, default: [] })
    // tracks?: TrackEntity;
    @PrimaryColumn('text', { array: true, default: [] })
    artists?: string[];

    @Column('text', { array: true, default: [] })
    albums?: string[];

    @Column('text', { array: true, default: [] })
    tracks?: string[];

    @ManyToOne(() => AlbumEntity, (album) => album.favourites, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    album: AlbumEntity;

    @ManyToOne(() => TrackEntity, (track) => track.favourites, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    track: TrackEntity;

    @ManyToOne(() => ArtistEntity, (artist) => artist.favourites, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    artist: ArtistEntity;
}
