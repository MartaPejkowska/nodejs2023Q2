import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid v4

    @Column()
    name: string;

    @Column()
    year: number;

    @Column()
    artistId: string | null; // refers to Artist

    @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
        onDelete: 'CASCADE',
    })
    artist: ArtistEntity;

    @OneToMany(() => TrackEntity, (track) => track.album, {
        cascade: true,
        eager: true,
    })
    tracks: TrackEntity[];
}
