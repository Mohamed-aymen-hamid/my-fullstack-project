import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  biography: string;

  @Column()
  photo: string; // Filename of the photo uploaded by the user

  @Column()
  booksWritten: number;

  @Column()
  averageRating: number;
}
