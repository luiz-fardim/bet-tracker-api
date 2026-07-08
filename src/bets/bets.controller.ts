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
  Query,
} from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FindBetDto } from './dto/find-bet.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BetResponseDto } from './dto/bet-response.dto';

@ApiBearerAuth()
@ApiTags('bets')
@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) { }

  @ApiOperation({ summary: 'Create a new bet' })
  @ApiResponse({ status: 201, description: 'Bet created successfully', type: BetResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBetDto: CreateBetDto, @Req() req) {
    return this.betsService.create(createBetDto, req.user.id);
  }

  @ApiOperation({ summary: 'Update a bet'})
  @ApiResponse({ status: 200, description: 'Bet updated successfully', type: BetResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Body() updateBetDto: UpdateBetDto,
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.betsService.update(id, req.user.id, updateBetDto);
  }

  @ApiOperation({ summary: 'Returned a bet list'})
  @ApiResponse({ status: 200, description: 'Bet list returned successfully', type: PaginationDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req, @Query() query: FindBetDto & PaginationDto) {
    return await this.betsService.findAll(
      req.user.id,
      query.limit,
      query.page,
      query.status,
    );
  }

  @ApiOperation({ summary: 'Get total profit'})
  @ApiResponse({ status: 200, description: 'Profit returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get('summary')
  async calculateTotalProfit() {
    return `You profit now is R$ ${await this.betsService.calculateTotalProfit()}`;
  }

  @ApiOperation({ summary: 'Return a specific bet'})
  @ApiResponse({ status: 200, description: 'Bet returned successfully', type: BetResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.betsService.findOne(id, req.user.id);
  }

  @ApiOperation({ summary: 'Delete a bet'})
  @ApiResponse({ status: 200, description: 'Bet deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.betsService.remove(id, req.user.id);
  }
}
