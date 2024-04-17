import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Farm, FarmSchema } from 'src/schemas/farm.schema';
import { FarmController } from './farm.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Farm.name, schema: FarmSchema }]),
    UserModule,
  ],
  providers: [FarmService],
  exports: [FarmService],
  controllers: [FarmController],
})
export class FarmModule {}
