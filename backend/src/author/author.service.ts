import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  // Find all authors
  findAll() {
    return this.authorRepository.find();
  }

  // Find one author by id
  async findOne(id: number) {
    const author = await this.authorRepository.findOne({ where: { id } }); // Fix here
    return author;
  }

  // Create a new author
  async create(createAuthorDto: CreateAuthorDto) {
    const newAuthor = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(newAuthor);
  }

  // Update an existing author
  async update(id: number, updateAuthorDto: CreateAuthorDto) {
    const author = await this.findOne(id);
    if (!author) {
      throw new Error('Author not found');
    }
    Object.assign(author, updateAuthorDto);
    return this.authorRepository.save(author);
  }

  // Delete an author
  async remove(id: number) {
    const author = await this.findOne(id);
    if (!author) {
      throw new Error('Author not found');
    }
    return this.authorRepository.remove(author);
  }
}
