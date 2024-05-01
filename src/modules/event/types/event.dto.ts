import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema } from 'mongoose';

export enum CorporalConditionEnum {
  SKINNY = 'skinny',
  IDEAL = 'ideal',
  FAT = 'fat',
}

export enum EventTypeEnum {
  MEASURE = 'body_measure',
  NOT_PREGNTANT = 'not_pregnant',
  CATTLE_BIRTH = 'cattle_birth',
  PREGNANT = 'pregnant',
  DEATH = 'death',
}

export class EventPayload {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  cattleId: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  farmId: Schema.Types.ObjectId;

  @IsEnum(EventTypeEnum)
  @IsNotEmpty()
  @IsDefined()
  eventType: EventTypeEnum; //TODO: Cambiar a enum

  @IsDateString()
  @IsNotEmpty()
  @IsDefined()
  eventDate: string;

  @IsEnum(CorporalConditionEnum)
  @IsOptional()
  eventDetail?: CorporalConditionEnum;

  @IsNumber()
  @IsOptional()
  measure?: number;

  @IsString()
  @IsOptional()
  observations?: string;
}
