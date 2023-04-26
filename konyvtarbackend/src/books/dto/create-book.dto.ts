import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    author: string;
    @IsNotEmpty()
    @IsInt()
    publish_year: number;
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    page_count: number;
}
