import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { expressExtInit } from './core/extensions/express.extension';
import { apiOptions } from './core/configs';
import { SwaggerHelper } from './core/helpers/swagger.helper';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: true,
      methods: 'GET,PUT,POST,DELETE,PATCH,HEAD',
      credentials: true,
    }
  });
  app.enableVersioning(apiOptions)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.use(expressExtInit);
  new SwaggerHelper(app);
  app.listen(80);
}
bootstrap();
