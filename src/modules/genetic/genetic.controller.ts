import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { GeneticService } from './genetic.service';
import { Genetic } from 'src/schemas/genetic.schema';

@Controller('/api/ranchi/genetic')
export class GeneticController {
  constructor(private readonly geneticService: GeneticService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public async createGenetic(@Body() body: Genetic): Promise<Genetic> {
    return this.geneticService.createGenetic(body);
  }

  @Get('/:farmId')
  @HttpCode(HttpStatus.OK)
  public async getAllGenetics(
    @Param('farmId') farmId: string,
  ): Promise<Genetic[]> {
    return this.geneticService.getAllGenetics(farmId);
  }

  @Patch('/delete/:id')
  @HttpCode(HttpStatus.OK)
  public async deleteGenetic(@Param('id') id: string): Promise<Genetic> {
    return this.geneticService.deleteGenetic(id);
  }
}
