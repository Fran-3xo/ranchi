import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from 'src/schemas/location.schema';

@Injectable()
export class LocationService {
  readonly #logger = new Logger(LocationService.name);
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<Location>,
  ) {}

  public async createLocation(body: Location): Promise<Location> {
    try {
      const location = new this.locationModel(body);
      return await location.save();
    } catch (e) {
      this.#logger.error(`Cannot create location: ${e.message}`);
      throw e;
    }
  }

  public async getAllLocations(farmId: string): Promise<Location[]> {
    try {
      const locations = await this.locationModel.find({
        farmId,
        deletedAt: null,
      });
      return locations ?? [];
    } catch (e) {
      this.#logger.error(`Cannot get all locations: ${e.message}`);
      throw e;
    }
  }

  public async deleteLocation(id: string): Promise<Location> {
    try {
      const genetic = await this.locationModel.findOneAndUpdate(
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
