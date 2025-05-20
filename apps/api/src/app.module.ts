import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TradesModule } from './trades/trades.module';
import { PrismaModule } from '../prisma/prisma.module';
import { InsightsModule } from './insights/insights.module';

@Module({
  imports: [PrismaModule, AuthModule, TradesModule, InsightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
