import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet, User])
],
  providers: [BetsService, JwtService],
  controllers: [BetsController],
})
export class BetsModule {}
