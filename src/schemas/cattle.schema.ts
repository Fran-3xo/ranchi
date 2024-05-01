import { HydratedDocument, Schema as SchemaMongoose } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Genetic } from './genetic.schema';
import { Location } from './location.schema';
import { Farm } from './farm.schema';

export type CattleDocument = HydratedDocument<Cattle>;

@Schema({ timestamps: true })
export class Cattle {
  @Prop({
    required: true,
    unique: false,
    type: SchemaMongoose.Types.ObjectId,
    ref: Genetic.name,
  })
  geneticId: SchemaMongoose.Types.ObjectId;

  @Prop({
    required: true,
    unique: false,
    type: SchemaMongoose.Types.ObjectId,
    ref: Location.name,
  })
  locationId: SchemaMongoose.Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId, ref: Farm.name })
  farmId: SchemaMongoose.Types.ObjectId;

  @Prop({ required: false, unique: false, default: 0 })
  defaultCicles?: number;

  @Prop({ required: true })
  caravan: string;
}

export const CattleSchema = SchemaFactory.createForClass(Cattle);
