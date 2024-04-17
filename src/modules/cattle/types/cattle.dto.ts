import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CattlePayload {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  geneticId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  locationId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  farmId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  caravan: string;

  @IsString()
  @IsOptional()
  defaultCicles?: number;
}
