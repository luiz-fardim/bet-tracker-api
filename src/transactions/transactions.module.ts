import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User])],
  providers: [TransactionsService, JwtService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
