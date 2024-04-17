import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipeEspañol } from './pipes/validation.pipe';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aplica el ValidationPipe a nivel global
  //app.useGlobalPipes(new ValidationPipeEspañol());

  await app.listen(3000);
}
bootstrap();
