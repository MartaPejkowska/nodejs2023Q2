import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class TrackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid v4

    @Column()
    name: string;

    @Column()
    artistId: string | null; // refers to Artist

    @Column()
    albumId: string | null; // refers to Album

    @Column()
    duration: number; // integer number

    @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
        onDelete: 'CASCADE',
    })
    album: AlbumEntity;

    @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
        onDelete: 'CASCADE',
    })
    artist: ArtistEntity;
}
