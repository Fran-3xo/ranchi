import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FarmDocument = HydratedDocument<Farm>;

@Schema({ timestamps: true })
export class Farm {
  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: true, unique: false })
  country: string;

  @Prop({ required: true, unique: false })
  city: string;

  @Prop({ required: false, unique: false, default: null })
  deletedAt?: Date;
}

export const FarmSchema = SchemaFactory.createForClass(Farm);
