import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBetDto: CreateBetDto) {
    return this.betsService.create(createBetDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Body() updateBetDto: UpdateBetDto, @Param('id') id: string) {
    return this.betsService.update(id, updateBetDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.betsService.findAll(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('summary')
  async calculateTotalProfit() {
    return `You profit now is R$ ${await this.betsService.calculateTotalProfit()}`
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.betsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.betsService.remove(id);
  }
}
