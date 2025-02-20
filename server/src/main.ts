import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerService } from './setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerService = app.get(SwaggerService);
  swaggerService.createSwaggerDocument(app);

  await app.listen(process.env.SERVER_PORT || 3000, '0.0.0.0');

  Logger.log(
    `Nest.js is running on Port [${process.env.SERVER_PORT}], using ENV mode [${process.env.NODE_ENV}]`,
  );
}
bootstrap();
