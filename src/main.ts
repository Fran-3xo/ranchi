import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipeEspañol } from './pipes/validation.pipe';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aplica el ValidationPipe a nivel global
  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
