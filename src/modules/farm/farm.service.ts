import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Farm } from 'src/schemas/farm.schema';
import { FarmDto } from './types/farm.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class FarmService {
  readonly #logger = new Logger(FarmService.name);
  constructor(
    @InjectModel(Farm.name)
    private readonly farmModel: Model<Farm>,
    private readonly userService: UserService,
  ) {}

  public async createFarm(body: FarmDto): Promise<any> {
    try {
      const newFarm = new this.farmModel(body);
      await newFarm.save();

      // Validate if the farm was created
      if (!newFarm) {
        return { success: false, message: 'Cannot create Farm!', farm: null };
      }

      // Update user with farmId
      await this.userService.updateUser({
        _id: body.userId,
        farmId: newFarm._id,
      });
      return newFarm;
    } catch (e) {
      this.#logger.error(
        `Cannot create farm with data: ${JSON.stringify(body)} error: ${e}`,
      );
      throw e;
    }
  }

  public async getAllFarms(): Promise<Farm[]> {
    try {
      return await this.farmModel.find({ deletedAt: null });
    } catch (e) {
      this.#logger.error(`Cannot get all farms: ${e.message}`);
      throw e;
    }
  }
}
