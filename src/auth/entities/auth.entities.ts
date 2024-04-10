import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: "user" })
    role: string;

}


export enum Roles {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity()
export class FavouriteCat {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    catId: number;

    @Column()
    userId: number;

}



