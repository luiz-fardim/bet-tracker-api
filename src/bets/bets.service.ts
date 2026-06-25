import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Bet)
    private betsRepository: Repository<Bet>,
  ) {}

  async create(createBetDto: CreateBetDto): Promise<Bet> {
    const bet = this.betsRepository.create(createBetDto);
    return this.betsRepository.save(bet);
  }

  async update(id: string, updateBetDto: UpdateBetDto): Promise<Bet> {
    const bet = await this.betsRepository.findOneBy({ id });
    if (!bet) {
      throw new NotFoundException('Bet is missing');
    }
    if (updateBetDto.status == 'won') {
    }
    const data = Object.assign(bet, updateBetDto);
    return this.betsRepository.save(data);
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

  async remove(id: string): Promise<void> {
    await this.betsRepository.delete(id);
  }
}
