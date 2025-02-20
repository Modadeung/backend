import { Module } from '@nestjs/common';
import { SlackModule } from './slack';
import { SettingModule } from './setting';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    DatabaseModule,
    SettingModule,
    SlackModule,
    UserModule,
    StoreModule,
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
