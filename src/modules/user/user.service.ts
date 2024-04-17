/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { LoginDto, UserPayload } from './types/user.dto';

@Injectable()
export class UserService {
  readonly #logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  public async createUser(body: UserPayload): Promise<User> {
    try {
      // Check if user exists
      const userExist = await this.getUserByEmail(body.email);
      if (userExist) {
        this.#logger.debug(`User already exists with email: ${body.email}`);
        throw new BadRequestException(
          `El usuario con email: ${body.email} ya existe!`,
        );
      }
      // Create the user
      const user = new this.userModel(body);
      return await user.save();
    } catch (e) {
      this.#logger.error(
        `Cannot create user with data: ${JSON.stringify(body)} error: ${e}`,
      );
      throw e;
    }
  }

  public async getFarmUsers(farmId: string): Promise<User[]> {
    try {
      const users = await this.userModel.find({ farmId });
      return users;
    } catch (e) {
      this.#logger.error(`Cannot get users for farmId: ${farmId} error: ${e}`);
      throw e;
    }
  }

  public async login(
    body: LoginDto,
  ): Promise<{ success: boolean; user: User }> {
    try {
      // Check if user exists
      const user = await this.userModel.findOne({ email: body.email });

      // If user not extis return error;
      if (!user) {
        this.#logger.debug(`User not found with email: ${body.email}`);
        return { success: false, user: null };
      }
      this.#logger.debug(`User found with email: ${body.email}`);

      // Compare the password
      const match = await bcrypt.compare(body.password, user.password);
      if (!match) {
        this.#logger.debug(
          `Password not match for user with email: ${body.email}`,
        );
        return { success: false, user: null };
      }

      this.#logger.debug(`User logged in with email: ${body.email}!`);
      return { success: true, user: user };
    } catch (e) {
      this.#logger.error(
        `Cannot login user with data: ${JSON.stringify(body)} error: ${e}`,
      );
      throw e;
    }
  }

  public async getUserById(id: string): Promise<User> {
    try {
      // Find user by id
      const user = await this.userModel.findOne({ _id: id });

      // If user not extis return error
      if (!user) {
        this.#logger.debug(`User not found with id: ${id}`);
        return null;
      }

      this.#logger.debug(`User found with id: ${id}`);
      return user;
    } catch (e) {
      this.#logger.error(`Cannot get user by id: ${id} error: ${e}`);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      // Find user by email
      const user = await this.userModel.findOne({ email});/*  */

      // If user not extis return error
      if (!user) {
        this.#logger.debug(`User not found with email: ${email}`);
        return null;
      }
      return {
        _id: user._id,
        email: user.email,
        farmId: user.farmId,
        type: user.type,
      } as any;
    } catch (e) {
      this.#logger.error(`Cannot get user by email: ${email} error: ${e}`);
    }
  }

  public async updateUser(body: any): Promise<User> {
    try {
      const updateUser = await this.userModel.findByIdAndUpdate(
        { _id: body._id },
        { farmId: body.farmId },
      );
      return updateUser;
    } catch (e) {
      this.#logger.error(
        `Cannot update user with data: ${JSON.stringify(body)} error: ${e}`,
      );
    }
  }
}
