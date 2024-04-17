import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, UserPayload } from './types/user.dto';
import { User } from 'src/schemas/user.schema';

@Controller('api/ranchi/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() user: UserPayload): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() user: LoginDto,
  ): Promise<{ success: boolean; user: User }> {
    return await this.userService.login(user);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  public async getUserByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.getUserByEmail(email);
  }
}
