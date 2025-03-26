import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './author/author.module'; // Import AuthorModule

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', // Use your database type here
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Dynamically load entities
      synchronize: true,  // Automatically create tables on startup
    }),
    AuthorModule,  // Include AuthorModule here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}



