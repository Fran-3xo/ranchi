import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/schemas/event.schema';
import { EventPayload } from './types/event.dto';

@Injectable()
export class EventService {
  readonly #logger = new Logger(EventService.name);
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,
  ) {}

  public async createEvent(event: EventPayload): Promise<Event> {
    try {
      const newEvent = new this.eventModel(event);
      return await newEvent.save();
    } catch (e) {
      this.#logger.error(
        `Cannot create event with data: ${JSON.stringify(event)} error: ${e}`,
      );
      throw e;
    }
  }
}
