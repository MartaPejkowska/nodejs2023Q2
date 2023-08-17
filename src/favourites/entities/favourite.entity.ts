import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinTable,
    OneToOne,
    JoinColumn,
} from 'typeorm';

@Entity()
export class FavouriteEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => ArtistEntity)
    @JoinTable()
    artist: ArtistEntity;

    @ManyToOne(() => AlbumEntity)
    @JoinTable()
    album: AlbumEntity;

    @ManyToOne(() => TrackEntity)
    @JoinTable()
    track: TrackEntity;
}

export interface FavoritesResponse {
    artists: ArtistEntity[];
    albums: AlbumEntity[];
    tracks: TrackEntity[];
}

@Entity('track-fav')
export class TrackFav {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    trackId: string | null;

    @OneToOne(() => TrackEntity, (track) => track.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    track: TrackEntity;
}

@Entity('artist-fav')
export class ArtistFav {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    artistId: string | null;

    @OneToOne(() => ArtistEntity, (artist) => artist.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    artist: ArtistEntity;
}

@Entity('album-fav')
export class AlbumFav {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    albumId: string | null;

    @OneToOne(() => AlbumEntity, (album) => album.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    album: AlbumEntity;
}
