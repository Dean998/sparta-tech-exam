import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradesService } from './trades/trades.service';
import { TradesModule } from './trades/trades.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TradesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, TradesService],
})
export class AppModule {}
