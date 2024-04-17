import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class EventPayload {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  caravan: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  eventType: string; //TODO: Cambiar a enum

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  eventDetail: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  observations: string;
}
