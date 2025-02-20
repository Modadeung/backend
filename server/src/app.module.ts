import { Module } from '@nestjs/common';
import { SlackModule } from './slack';
import { SettingModule } from './setting';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    DatabaseModule,
    SettingModule,
    SlackModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
