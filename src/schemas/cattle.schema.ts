import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CattleDocument = HydratedDocument<Cattle>;

@Schema({ timestamps: true })
export class Cattle {
  @Prop({ required: true })
  geneticId: string;

  @Prop({ required: true })
  locationId: string;

  @Prop({ required: true })
  farmId: string;

  @Prop({ required: false, unique: false, default: 0 })
  defaultCicles?: number;

  @Prop({ required: true })
  caravan: string;
}

export const CattleSchema = SchemaFactory.createForClass(Cattle);
