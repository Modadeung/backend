import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { IOpenApiConfig } from 'src/config';

@Injectable()
export class SwaggerService {
  constructor(private readonly configService: ConfigService<IOpenApiConfig>) {}
  createSwaggerDocument(app: INestApplication) {
    this.basicAuth(app);

    const config = new DocumentBuilder()
      .setTitle('BOILER-PLATE API')
      .setDescription('BOILER-PLATE API description')
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

  private basicAuth(app: INestApplication) {
    app.use(
      ['/swagger'],
      expressBasicAuth({
        challenge: true,
        users: {
          [this.configService.get('openAPIUserName')]:
            this.configService.get('openAPIPassWord'),
        },
      }),
    );
  }
}
