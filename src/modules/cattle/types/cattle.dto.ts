import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class CattlePayload {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  geneticId: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  locationId: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  farmId: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  caravan: string;

  @IsString()
  @IsOptional()
  defaultCicles?: number;
}
