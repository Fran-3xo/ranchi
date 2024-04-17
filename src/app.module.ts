import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { RanchiModule } from './modules/ranchi.module';

@Module({
  imports: [RanchiModule],
  controllers: [HealthController],
})
export class AppModule {}
