import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { TradesController } from './trades.controller';
import { TradesService } from './trades.service';

@Module({
  controllers: [TradesController],
  imports: [PrismaModule],
  providers: [TradesService],
})
export class TradesModule {}
