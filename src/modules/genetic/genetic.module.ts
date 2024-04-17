import { Module } from '@nestjs/common';
import { GeneticService } from './genetic.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genetic, GeneticSchema } from 'src/schemas/genetic.schema';
import { GeneticController } from './genetic.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genetic.name, schema: GeneticSchema }]),
  ],
  providers: [GeneticService],
  exports: [GeneticService],
  controllers: [GeneticController],
})
export class GeneticModule {}
