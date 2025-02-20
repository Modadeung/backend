import { INestApplication, Injectable } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  createSwaggerDocument(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Modadeug API')
      .setDescription('Modadeug API description')
      .setVersion('3.0')
      .build();

    const swaggerCustomOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
    };

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, swaggerCustomOptions);
  }
}
