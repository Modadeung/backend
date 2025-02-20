import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './data-sources';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOption,
      logging: process.env.NODE_ENV === 'development' ? 'all' : undefined,
    }),
  ],
  providers: [],
})
export class DatabaseModule {}
