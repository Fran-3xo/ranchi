import { Module } from '@nestjs/common';
import { CattleService } from './cattle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cattle, CattleSchema } from 'src/schemas/cattle.schema';
import { CattleController } from './cattle.controller';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cattle.name, schema: CattleSchema }]),
    EventModule,
  ],
  providers: [CattleService],
  exports: [CattleService],
  controllers: [CattleController],
})
export class CattleModule {}
