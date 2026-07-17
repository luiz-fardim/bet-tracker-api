import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { TransactionStatusEnum } from 'src/enum/transactionStatus.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: string,
  ): Promise<TransactionResponseDto> {
    const user = await this.usersRepository.findOneByOrFail({ id: userId });

    const transaction = this.transactionsRepository.create({
      ...createTransactionDto,
      user,
      profit: null,
    });

    const saved = await this.transactionsRepository.save(transaction);

    return {
      id: saved.id,
      assetName: saved.assetName,
      assetType: saved.assetType,
      broker: saved.broker,
      quantity: Number(saved.quantity),
      buyPrice: Number(saved.buyPrice),
      sellPrice: saved.sellPrice != null ? Number(saved.sellPrice) : null,
      fees: Number(saved.fees),
      status: saved.status,
      profit: saved.profit,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  async update(
    id: string,
    userId: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOneBy({
      id,
      user: { id: userId },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction is missing');
    }

    const data = Object.assign(transaction, updateTransactionDto);
    const buyPrice = data.buyPrice ?? transaction.buyPrice;
    const quantity = data.quantity ?? transaction.quantity;
    const fees = data.fees ?? transaction.fees;

    if (data.status === TransactionStatusEnum.CLOSED) {
      const sellPrice = data.sellPrice ?? transaction.sellPrice;
      if (sellPrice != null) {
        data.profit = parseFloat(
          (((sellPrice - buyPrice) * quantity - fees) as number).toFixed(2),
        );
      }
    } else {
      data.profit = null;
    }

    return this.transactionsRepository.save(data);
  }

  async getSummary(userId: string) {
    const transactions = await this.transactionsRepository.find({
      where: { user: { id: userId } },
    });

    const totalInvested = transactions.reduce((sum, transaction) => {
      return sum + Number(transaction.quantity) * Number(transaction.buyPrice);
    }, 0);

    const totalProfit = transactions.reduce((sum, transaction) => {
      return transaction.status === TransactionStatusEnum.CLOSED &&
        transaction.profit != null
        ? sum + Number(transaction.profit)
        : sum;
    }, 0);

    const roi = totalInvested > 0 ? totalProfit / totalInvested : 0;

    return {
      totalInvested: Number(totalInvested.toFixed(2)),
      totalProfit: Number(totalProfit.toFixed(2)),
      roi: Number(roi.toFixed(4)),
    };
  }

  async findOne(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOneBy({
      id,
      user: { id: userId },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async findAll(
    userId: string,
    limit: number = 10,
    page: number = 1,
    status?: TransactionStatusEnum,
  ): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: { user: { id: userId }, ...(status && { status }) },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const transaction = await this.transactionsRepository.findOneBy({
      id,
      user: { id: userId },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    await this.transactionsRepository.delete(id);
    return { message: 'Transaction deleted successfully' };
  }
}
