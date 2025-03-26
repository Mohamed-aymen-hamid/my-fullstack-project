import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async update(id: number, createBookDto: CreateBookDto): Promise<Book> {
    await this.bookRepository.update(id, createBookDto);
    const book = await this.bookRepository.findOne({ where: { id } });  // Use 'where'
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }
  

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);  // Delete the book by id
  }
}

