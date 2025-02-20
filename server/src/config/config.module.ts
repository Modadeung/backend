import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import configuration from './configuration';
import { NestEnvUtil } from './nest-env.util';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NestEnvUtil.getEnvFilePath(),
      load: [configuration],
    }),
  ],
})
export class ConfigModule {}
