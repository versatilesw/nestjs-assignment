import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column({ default: true })
    dateCreated: string;

    @Column({ default: true, nullable: true })
    lastUpdated: string;
}


export enum Roles {
    ADMIN = 'admin',
    USER = 'user',
}