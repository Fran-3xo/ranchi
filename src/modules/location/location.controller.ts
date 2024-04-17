import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from 'src/schemas/location.schema';

@Controller('api/ranchi/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public async createLocation(@Body() body: Location): Promise<Location> {
    return this.locationService.createLocation(body);
  }

  @Get('/:farmId')
  @HttpCode(HttpStatus.OK)
  public async getAllLocations(
    @Param('farmId') farmId: string,
  ): Promise<Location[]> {
    return this.locationService.getAllLocations(farmId);
  }

  @Patch('/delete/:id')
  @HttpCode(HttpStatus.OK)
  public async deleteLocation(@Param('id') id: string): Promise<Location> {
    return this.locationService.deleteLocation(id);
  }
}
