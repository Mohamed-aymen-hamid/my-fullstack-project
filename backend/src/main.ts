import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable CORS directly without CorsOptions
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend URL
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'));  // Serve static files
  await app.listen(3001);
}
bootstrap();
