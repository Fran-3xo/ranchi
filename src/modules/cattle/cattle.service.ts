import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cattle } from 'src/schemas/cattle.schema';
import { CattlePayload } from './types/cattle.dto';

@Injectable()
export class CattleService {
  readonly #logger = new Logger(CattleService.name);

  constructor(
    @InjectModel(Cattle.name)
    private readonly cattleModel: Model<Cattle>,
  ) {}

  public async createCattle(cattle: CattlePayload): Promise<Cattle> {
    try {
      const newCattle = new this.cattleModel(cattle);
      return await newCattle.save();
    } catch (e) {
      this.#logger.error(
        `Cannot create cattle with data: ${JSON.stringify(cattle)} error: ${e}`,
      );
      throw e;
    }
  }

  public async getCattleByFarmId(farmId: string): Promise<Cattle[]> {
    try {
      return await this.cattleModel.find({ farmId });
    } catch (e) {
      this.#logger.error(
        `Cannot get cattle with farmId: ${farmId} error: ${e}`,
      );
      throw e;
    }
  }

  public async getCattleById(cattleId: string): Promise<Cattle> {
    try {
      const cattle = await this.cattleModel.findOne({ _id: cattleId });
      return cattle;
    } catch (e) {
      this.#logger.error(
        `Cannot get cattle with id: ${cattleId} error: ${JSON.stringify(e)}`,
      );
      throw e;
    }
  }

  public async deleteCattle(cattleId: string): Promise<Cattle> {
    try {
      const cattle = await this.cattleModel.findByIdAndUpdate(
        { _id: cattleId },
        { deletedAt: new Date() },
      );
      return cattle;
    } catch (e) {
      this.#logger.error(
        `Cannot delete cattle with id: ${cattleId} error: ${e}`,
      );
      throw e;
    }
  }
}
