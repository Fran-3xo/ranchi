import {
  Controller,
  Post,
  HttpStatus,
  Body,
  HttpCode,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { CattleService } from './cattle.service';
import { CattlePayload } from './types/cattle.dto';
import { Cattle } from 'src/schemas/cattle.schema';

@Controller('api/ranchi/cattle')
export class CattleController {
  constructor(private readonly cattleService: CattleService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public async createCattle(
    @Body() cattle: CattlePayload,
  ): Promise<CattlePayload> {
    return await this.cattleService.createCattle(cattle);
  }

  @Get('/:farmId')
  @HttpCode(HttpStatus.OK)
  public async getCattleByFarmId(
    @Param('farmId') farmId: string,
  ): Promise<CattlePayload[]> {
    return await this.cattleService.getCattleByFarmId(farmId);
  }

  @Get('/id/:id')
  @HttpCode(HttpStatus.OK)
  public async getCattleById(@Param('id') id: string): Promise<Cattle> {
    return await this.cattleService.getCattleById(id);
  }

  @Patch('/delete/:id')
  @HttpCode(HttpStatus.OK)
  public async deleteCattle(@Param('id') id: string): Promise<Cattle> {
    return await this.cattleService.deleteCattle(id);
  }
}
