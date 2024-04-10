import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: string;

    @Column({ default: true})
    dateCreated:string;

    @Column({ default:true, nullable: true})
    lastUpdated: string;
}
