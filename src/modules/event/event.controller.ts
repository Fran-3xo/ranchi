import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventPayload } from './types/event.dto';
import { Event } from 'src/schemas/event.schema';

@Controller('api/ranchi/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public async createEvent(@Body() event: EventPayload): Promise<Event> {
    return await this.eventService.createEvent(event);
  }

  @Get('/:cattleId/:farmId')
  @HttpCode(HttpStatus.OK)
  public async getEventByCattle(
    @Param('cattleId') cattleId: string,
    @Param('farmId') farmId: string,
  ): Promise<Event[]> {
    return await this.eventService.getEventByCattle(cattleId, farmId);
  }

  @Patch('/delete/:eventId')
  @HttpCode(HttpStatus.OK)
  public async deleteEvent(@Param('eventId') eventId: string): Promise<Event> {
    return await this.eventService.deleteEvent(eventId);
  }
}
