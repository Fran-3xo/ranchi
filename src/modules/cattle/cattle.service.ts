import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Cattle } from 'src/schemas/cattle.schema';
import { CattlePayload } from './types/cattle.dto';
import { EventService } from '../event/event.service';
import { Event } from 'src/schemas/event.schema';
import { EventTypeEnum } from '../event/types/event.dto';

@Injectable()
export class CattleService {
  readonly #logger = new Logger(CattleService.name);

  constructor(
    @InjectModel(Cattle.name)
    private readonly cattleModel: Model<Cattle>,
    private readonly eventService: EventService,
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

  public async getCattleByFarmId(farmId: string): Promise<any[]> {
    try {
      const cattles = await this.cattleModel
        .find({
          farmId: new mongoose.Types.ObjectId(farmId),
        })
        .populate('geneticId', 'name')
        .populate('locationId', 'name');

      const formatedCattles = await Promise.all(
        cattles.map(async (cattle: any) => {
          // Obtener los eventos para este ganado
          const events = await this.eventService.getEventByCattle(
            cattle._id,
            farmId,
          );

          let state = '';
          let bodyCondition = '';

          if (events.length) {
            events.sort(
              (a, b) => b.eventDate.getTime() - a.eventDate.getTime(),
            );

            // Obtener el último evento de tipo body measure
            const lastBodyMeasureEvent = events.find(
              (event) => event.eventType !== EventTypeEnum.MEASURE,
            );

            const lastEvent = lastBodyMeasureEvent || events[0];

            // Determinar el estado del animal
            state = this.getCattleStatus(lastEvent.eventType);

            // Determinar el estado corporal
            bodyCondition = await this.getCorporalCondition(events);
          }

          return {
            _id: cattle._id,
            geneticName: cattle.geneticId.name,
            locationName: cattle.locationId.name,
            farmId: cattle.farmId,
            defaultCicles: cattle.defaultCicles,
            caravan: cattle.caravan,
            createdAt: cattle.createdAt,
            updatedAt: cattle.updatedAt,
            state,
            bodyCondition,
          };
        }),
      );

      return formatedCattles;
    } catch (e) {
      this.#logger.error(
        `Cannot get cattle with farmId: ${farmId} error: ${e}`,
      );
      throw e;
    }
  }

  private getCattleStatus(type: EventTypeEnum): string {
    switch (type) {
      case EventTypeEnum.CATTLE_BIRTH:
        return 'gestante';
      case EventTypeEnum.NOT_PREGNTANT:
        return 'no gestante';
      case EventTypeEnum.DEATH:
        return 'muerte';
      case EventTypeEnum.PREGNANT:
        return 'gestante';
      default:
        return 'no gestante';
    }
  }

  private async getCorporalCondition(events: Event[]) {
    try {
      // Find the last body measurement event
      const lastBodyMeasurementEvent = events.find(
        (event) => event.eventType === EventTypeEnum.MEASURE,
      );
      if (lastBodyMeasurementEvent) {
        return lastBodyMeasurementEvent.eventDetail;
      }
      return null;
    } catch (e) {
      this.#logger.error(
        `Cannot get body condition with events: ${JSON.stringify(events)} error: ${e}`,
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
