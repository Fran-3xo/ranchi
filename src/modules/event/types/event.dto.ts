import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EventPayload {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  cattleId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  eventType: string; //TODO: Cambiar a enum

  @IsDateString()
  @IsNotEmpty()
  @IsDefined()
  eventDate: string;

  @IsString()
  @IsOptional()
  eventDetail?: string;

  @IsNumber()
  @IsOptional()
  measure?: number;

  @IsString()
  @IsOptional()
  observations?: string;
}
