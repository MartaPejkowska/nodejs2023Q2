import { ArtistEntity } from 'src/artist/entities/artist.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
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

    @OneToOne(() => ArtistEntity, (artist) => artist.id, {
        onDelete: 'CASCADE',
    })
    @ManyToOne(() => ArtistEntity)
    @JoinColumn({ name: 'artistId' })
    artist: ArtistEntity;

}

