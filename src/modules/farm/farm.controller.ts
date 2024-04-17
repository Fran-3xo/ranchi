import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmDto } from './types/farm.dto';
import { Farm } from 'src/schemas/farm.schema';

@Controller('api/ranchi/farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public async createFarm(@Body() farm: FarmDto): Promise<Farm> {
    return await this.farmService.createFarm(farm);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  public async getAllFarms(): Promise<Farm[]> {
    return await this.farmService.getAllFarms();
  }
}
