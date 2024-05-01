import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as SchemaMongoose } from 'mongoose';

@Schema({ timestamps: true })
export class Location extends Document {
  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: false, unique: false })
  description?: string;

  @Prop({ required: true, unique: false, type: SchemaMongoose.Types.ObjectId })
  farmId: SchemaMongoose.Types.ObjectId;

  @Prop({ required: false, unique: false })
  deletedAt: Date;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
