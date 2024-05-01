import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaMongoose } from 'mongoose';

export type EventDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: true, unique: false })
  type: string;

  @Prop({ required: false, unique: false, type: SchemaMongoose.Types.ObjectId })
  farmId?: SchemaMongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
