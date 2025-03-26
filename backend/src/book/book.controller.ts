import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()  // GET /books - Fetch all books
  getBooks() {
    return this.bookService.findAll();
  }

  @Post()  // POST /books - Create a new book
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')  // PUT /books/:id - Update a book
  updateBook(@Param('id') id: number, @Body() createBookDto: CreateBookDto) {
    return this.bookService.update(id, createBookDto);
  }

  @Delete(':id')  // DELETE /books/:id - Delete a book
  removeBook(@Param('id') id: number) {
    return this.bookService.remove(id);
  }
}

