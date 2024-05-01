import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaMongoose } from 'mongoose';
import { Cattle } from './cattle.schema';
import { Farm } from './farm.schema';
import { EventTypeEnum } from 'src/modules/event/types/event.dto';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  @Prop({
    required: true,
    unique: false,
    type: SchemaMongoose.Types.ObjectId,
    ref: Cattle.name,
  })
  cattleId: SchemaMongoose.Types.ObjectId;

  @Prop({
    required: true,
    unique: false,
    type: SchemaMongoose.Types.ObjectId,
    ref: Farm.name,
  })
  farmId: SchemaMongoose.Types.ObjectId;

  @Prop({ required: true, unique: false })
  eventType: EventTypeEnum;

  @Prop({ required: true, unique: false })
  eventDate: Date;

  @Prop({ required: false, unique: false })
  eventDetail?: string;

  @Prop({ required: false, unique: false })
  measure?: number;

  @Prop({ required: false, unique: false })
  observations?: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
