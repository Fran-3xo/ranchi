import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genetic } from 'src/schemas/genetic.schema';

@Injectable()
export class GeneticService {
  readonly #logger = new Logger(GeneticService.name);

  constructor(
    @InjectModel(Genetic.name)
    private readonly geneticModel: Model<Genetic>,
  ) {}

  public async createGenetic(body: Genetic): Promise<Genetic> {
    try {
      const genetic = new this.geneticModel(body);
      return await genetic.save();
    } catch (e) {
      this.#logger.error(`Cannot create genetic: ${e.message}`);
      throw e;
    }
  }

  public async getAllGenetics(farmId: string): Promise<Genetic[]> {
    try {
      const genetics = await this.geneticModel.find({
        deletedAt: null,
        farmId,
      });
      return genetics;
    } catch (error) {
      this.#logger.error(`Cannot get all genetics: ${error.message}`);
      throw error;
    }
  }

  public async deleteGenetic(id: string): Promise<Genetic> {
    try {
      const genetic = await this.geneticModel.findOneAndUpdate(
        { _id: id },
        {
          deletedAt: new Date(),
        },
      );
      return genetic;
    } catch (error) {
      this.#logger.error(`Cannot delete genetic: ${error.message}`);
      throw error;
    }
  }
}
