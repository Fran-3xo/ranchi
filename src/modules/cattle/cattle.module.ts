import { Module } from '@nestjs/common';
import { CattleService } from './cattle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cattle, CattleSchema } from 'src/schemas/cattle.schema';
import { CattleController } from './cattle.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cattle.name, schema: CattleSchema }]),
  ],
  providers: [CattleService],
  exports: [CattleService],
  controllers: [CattleController],
})
export class CattleModule {}
