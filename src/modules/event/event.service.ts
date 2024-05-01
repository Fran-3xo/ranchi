import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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

  public async getEventByCattle(
    cattleId: string,
    farmId: string,
  ): Promise<Event[]> {
    try {
      const events = await this.eventModel.find({
        cattleId: new mongoose.Types.ObjectId(cattleId),
        farmId: new mongoose.Types.ObjectId(farmId),
        deletedAt: null,
      });
      return events;
    } catch (e) {
      this.#logger.error(
        `Cannot get event by cattleId: ${cattleId} error: ${JSON.stringify(e)}`,
      );
      throw e;
    }
  }

  public async deleteEvent(eventId: string): Promise<Event> {
    try {
      const event = await this.eventModel.findOneAndUpdate(
        { _id: eventId },
        { deletedAt: new Date() },
      );
      return event;
    } catch (e) {
      this.#logger.error(
        `Cannot delete event with id: ${eventId} error: ${JSON.stringify(e)}`,
      );
      throw e;
    }
  }
}
