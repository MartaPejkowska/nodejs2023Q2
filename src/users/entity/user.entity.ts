import { Exclude } from 'class-transformer';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid v4

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    login: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({ nullable: false, default: 1 })
    version: number;

    // @CreateDateColumn({type: 'timestamp'})
    // createdAt: Date;

    // @UpdateDateColumn({type: 'timestamp'})
    // updatedAt: Date;
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
