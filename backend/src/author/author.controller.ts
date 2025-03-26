import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAuthors() {
    return this.authorService.findAll();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = Date.now() + extname(file.originalname);
          callback(null, filename);
        },
      }),
    }),
  )
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    if (!photo) {
      throw new BadRequestException('Photo is required');
    }

    if (
      !createAuthorDto.name ||
      !createAuthorDto.biography ||
      !createAuthorDto.booksWritten ||
      !createAuthorDto.averageRating
    ) {
      throw new BadRequestException('All fields are required');
    }

    createAuthorDto.photo = photo.filename;
    return this.authorService.create(createAuthorDto);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = Date.now() + extname(file.originalname);
          callback(null, filename);
        },
      }),
    }),
  )
  async updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const updates: any = {};

    if (body.name?.trim()) updates.name = body.name;
    if (body.biography?.trim()) updates.biography = body.biography;
    if (body.booksWritten !== undefined) updates.booksWritten = parseInt(body.booksWritten);
    if (body.averageRating !== undefined) updates.averageRating = parseFloat(body.averageRating);
    if (photo) updates.photo = photo.filename;

    if (Object.keys(updates).length === 0) {
      throw new BadRequestException('No fields to update');
    }

    return this.authorService.update(id, updates);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.authorService.remove(id);
    return { message: 'Author successfully deleted.' };
  }
}
