import { Injectable } from '@nestjs/common';
import { FarmService } from './farm/farm.service';
import { FarmDto } from './farm/types/farm.dto';
import { Farm } from 'src/schemas/farm.schema';
import { UserService } from './user/user.service';
import { CattleService } from './cattle/cattle.service';
import { EventService } from './event/event.service';
import { LoginDto, UserPayload } from './user/types/user.dto';
import { User } from 'src/schemas/user.schema';
import { CattlePayload } from './cattle/types/cattle.dto';
import { Cattle } from 'src/schemas/cattle.schema';
import { EventPayload } from './event/types/event.dto';
import { Event } from 'src/schemas/event.schema';
import { Genetic } from 'src/schemas/genetic.schema';
import { GeneticService } from './genetic/genetic.service';

@Injectable()
export class RanchiService {
  constructor(
    private readonly farmService: FarmService,
    private readonly userService: UserService,
    private readonly cattleService: CattleService,
    private readonly eventService: EventService,
    private readonly geneticService: GeneticService,
  ) {}

  public async createFarm(farm: FarmDto): Promise<Farm> {
    return await this.farmService.createFarm(farm);
  }

  public async getAllFarms(): Promise<Farm[]> {
    return await this.farmService.getAllFarms();
  }

  public async createUser(
    user: UserPayload,
  ): Promise<User> {
    return await this.userService.createUser(user);
  }

  public async login(
    user: LoginDto,
  ): Promise<{ success: boolean; user: User }> {
    return await this.userService.login(user);
  }

  public async getUserById(userId: string): Promise<User> {
    return await this.userService.getUserById(userId);
  }

  public async getFarmUsers(farmId: string): Promise<User[]> {
    return await this.userService.getFarmUsers(farmId);
  }

  public async createCattle(cattle: CattlePayload): Promise<Cattle> {
    return await this.cattleService.createCattle(cattle);
  }

  public async createEvent(event: EventPayload): Promise<Event> {
    return await this.eventService.createEvent(event);
  }

  public async getCattleByFarmId(farmId: string): Promise<Cattle[]> {
    return await this.cattleService.getCattleByFarmId(farmId);
  }

  public async createGenetic(body: Genetic): Promise<Genetic> {
    return await this.geneticService.createGenetic(body);
  }

  public async getAllGenetics(farmId: string): Promise<Genetic[]> {
    return await this.geneticService.getAllGenetics(farmId);
  }

  public async deleteGenetic(id: string): Promise<Genetic> {
    return await this.geneticService.deleteGenetic(id);
  }
}
