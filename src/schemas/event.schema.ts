import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  caravan: string;

  @Prop({ required: true })
  eventType: string;

  @Prop({ required: true })
  eventDetail: string;

  @Prop({ required: true })
  observations: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
