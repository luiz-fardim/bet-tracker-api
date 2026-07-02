import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { betResponseDto } from './dto/bet-response.dto';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Bet)
    private betsRepository: Repository<Bet>,

    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createBetDto: CreateBetDto): Promise<betResponseDto> {
    const { userId, ...betData } = createBetDto;

    const user = await this.usersRepository.findOneByOrFail({
      id: userId,
    });

    const bet = this.betsRepository.create({
      ...betData,
      user,
    });

    const saved = await this.betsRepository.save(bet);

    return {
      odd: saved.odd,
      homeTeam: saved.homeTeam,
      visitingTeam: saved.visitingTeam,
      value: saved.value,
      market: saved.market
    }
  }

  async update(id: string, updateBetDto: UpdateBetDto): Promise<Bet> {
    const bet = await this.betsRepository.findOneBy({ id });
    if (!bet) {
      throw new NotFoundException('Bet is missing');
    }
    if (updateBetDto.status == 'won') {
      const profit = bet.value * bet.odd - bet.value;
      bet.profit = profit;
      bet.status = updateBetDto.status;
      return this.betsRepository.save(bet);
    }
    if (updateBetDto.status == 'lost') {
      const profit = -bet.value;
      bet.profit = profit;
      bet.status = updateBetDto.status;
      return this.betsRepository.save(bet);
    }

    const data = Object.assign(bet, updateBetDto);
    return this.betsRepository.save(data);
  }

  async calculateTotalProfit() {
    const result = await this.betsRepository.sum('profit');
    return result ?? 0;
  }

  async findOne(id: string): Promise<Bet> {
    const bet = await this.betsRepository.findOneBy({ id });
    if (!bet) {
      throw new NotFoundException('Bet not found');
    }
    return bet;
  }

  async findAll(): Promise<Bet[]> {
    return this.betsRepository.find();
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.betsRepository.delete(id);
    return { message: 'Bet deleted successfully' };
  }
}
