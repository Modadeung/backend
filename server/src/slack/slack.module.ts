import { Module } from '@nestjs/common';
import { SlackEventHandler } from './event.handler';
import { FilterSlackService } from './filter';

@Module({
  imports: [],
  controllers: [],
  providers: [SlackEventHandler, FilterSlackService],
})
export class SlackModule {}
