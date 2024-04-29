// HAHA f'king railway, doesnt read the enviroment variables.
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { FarmModule } from './farm/farm.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CattleModule } from './cattle/cattle.module';
import { EventModule } from './event/event.module';
import { GeneticModule } from './genetic/genetic.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    FarmModule,
    UserModule,
    CattleModule,
    EventModule,
    GeneticModule,
    LocationModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
})
export class RanchiModule {}
