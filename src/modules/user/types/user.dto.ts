import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum UserTypeEnum {
  OWNER = 'owner',
  OPERATOR = 'operator',
}

export class UserPayload {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsEnum(UserTypeEnum)
  @IsNotEmpty()
  @IsDefined()
  type: UserTypeEnum;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;

/*   @IsString()
  @IsNotEmpty()
  @IsDefined()
  id: string; */
}
