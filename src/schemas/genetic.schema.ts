import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Genetic extends Document {
  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: false, unique: false })
  description?: string;

  @Prop({ required: true, unique: false })
  farmId: string;

  @Prop({ required: false, unique: false })
  deletedAt: Date;
}

export const GeneticSchema = SchemaFactory.createForClass(Genetic);
