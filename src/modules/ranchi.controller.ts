import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { RanchiService } from './ranchi.service';
import { CattlePayload } from './cattle/types/cattle.dto';
import { EventPayload } from './event/types/event.dto';
import { Event } from 'src/schemas/event.schema';
import { Genetic } from 'src/schemas/genetic.schema';

@Controller('api/ranchi')
export class RanchiController {
  constructor(private readonly ranchiService: RanchiService) {}

  /*   @Get('/user/:farmId')
  @HttpCode(HttpStatus.OK)
  public async getFarmUsers(@Param('farmId') farmId: string): Promise<User[]> {
    return await this.ranchiService.getFarmUsers(farmId);
  } */

  @Post('/event')
  @HttpCode(HttpStatus.CREATED)
  public async createEvent(@Body() event: EventPayload): Promise<Event> {
    return await this.ranchiService.createEvent(event);
  }
}
