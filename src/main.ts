import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { expressExtInit } from './core/extensions/express.extension';
import { apiOptions } from './core/configs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(expressExtInit);
  app.enableVersioning(apiOptions)
  await app.listen(80);
}
bootstrap();
