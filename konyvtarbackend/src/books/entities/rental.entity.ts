import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Book} from "./book.entity"

@Entity("rentals")
export class Rental{

    @PrimaryGeneratedColumn()
    id: number;

    @Column("date")
    start_date: Date;

    @Column("date")
    end_date: Date;

    @ManyToOne(()=> Book, (book) => book.rentals)
    book: Book;
}