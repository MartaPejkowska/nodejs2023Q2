import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class FavouriteEntity {
    albums: AlbumEntity[];
    tracks: TrackEntity[];
    artists: ArtistEntity[];
}

@Entity('track-fav')
export class TrackFav {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    trackId: string | null;

    @ManyToOne(() => TrackEntity, { onDelete: 'SET NULL', eager: true })
    track: TrackEntity;
}

@Entity('artist-fav')
export class ArtistFav {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    artistId: string | null;

    @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL', eager: true })
    artist: ArtistEntity;
}

@Entity('album-fav')
export class AlbumFav {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    albumId: string | null;

    @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL', eager: true })
    album: AlbumEntity;
}

