import { IEvent } from '@nestjs/cqrs';

export class FilterSlackEvent implements IEvent {
  constructor(
    public readonly code: string,
    public readonly status: number,
    public readonly method: string,
    public readonly path: string,
    public readonly message: string,
    public readonly stackTrace: string,
  ) {}
}
