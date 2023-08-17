import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity()
export class TrackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid v4

    @Column()
    name: string;

    @ManyToOne(() => ArtistEntity)
    @JoinColumn({ name: 'artistId' })
    artist: ArtistEntity;

    @Column({ nullable: true })
    artistId: string | null;

    @ManyToOne(() => AlbumEntity)
    @JoinColumn({ name: 'albumId' })
    album: AlbumEntity;

    @Column({ nullable: true })
    albumId: string | null;

    @Column()
    duration: number;

}
