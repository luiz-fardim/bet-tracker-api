import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';

@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  create(@Body() createBetDto: CreateBetDto) {
    return this.betsService.create(createBetDto);
  }

  @Patch(':id')
  update(@Body() updateBetDto: UpdateBetDto, @Param('id') id: string) {
    return this.betsService.update(id, updateBetDto);
  }

  @Get()
  findAll() {
    return this.betsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.betsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.betsService.remove(id);
  }
}
