import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true, unique: false })
  cattleId: string;

  @Prop({ required: true, unique: false })
  farmId: string;

  @Prop({ required: true, unique: false })
  eventType: string;

  @Prop({ required: true, unique: false })
  eventDate: string;

  @Prop({ required: false, unique: false })
  eventDetail?: string;

  @Prop({ required: false, unique: false })
  measure?: number;

  @Prop({ required: false, unique: false })
  observations?: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
