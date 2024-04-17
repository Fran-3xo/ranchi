import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Farm } from 'src/schemas/farm.schema';

export class FarmDto extends Farm {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  userId: string;
}
