import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [ConfigModule.forRoot(), PassportModule],
  controllers: [AppController],
  providers: [AppService, FacebookStrategy, GoogleStrategy, LocalStrategy],
})
export class AppModule {}
