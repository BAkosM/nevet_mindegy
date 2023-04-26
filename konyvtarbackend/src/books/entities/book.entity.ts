import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rental } from "./rental.entity";

@Entity("books")
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    publish_year: number;

    @Column()
    page_count: number;

    @OneToMany(() => Rental, (rental) => rental.book)
    rentals: Rental[];
}
