import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FilterSlackEvent, FilterSlackService } from './filter';

@EventsHandler(FilterSlackEvent)
export class SlackEventHandler implements IEventHandler<FilterSlackEvent> {
  constructor(private readonly filterSlackService: FilterSlackService) {}

  async handle(event: FilterSlackEvent) {
    switch (event.constructor) {
      case FilterSlackEvent:
        await this.handleFilterSlackEvent(event as FilterSlackEvent);
        break;

      default:
        break;
    }
  }

  private async handleFilterSlackEvent(event: FilterSlackEvent) {
    await this.filterSlackService.sendErrorMessage(event);
  }
}
