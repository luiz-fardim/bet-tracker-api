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
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FindTransactionDto } from './dto/find-transaction.dto';
import { PaginationDto } from './dto/pagination.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionResponseDto } from './dto/transaction-response.dto';

@ApiBearerAuth()
@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ summary: 'Create a new investment transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    return this.transactionsService.create(createTransactionDto, req.user.id);
  }

  @ApiOperation({ summary: 'Update an investment transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated successfully',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.transactionsService.update(
      id,
      req.user.id,
      updateTransactionDto,
    );
  }

  @ApiOperation({ summary: 'Return a transaction list' })
  @ApiResponse({
    status: 200,
    description: 'Transaction list returned successfully',
    type: PaginationDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Req() req,
    @Query() query: FindTransactionDto & PaginationDto,
  ) {
    return await this.transactionsService.findAll(
      req.user.id,
      query.limit,
      query.page,
      query.status,
    );
  }

  @ApiOperation({
    summary: 'Get transaction summary for the authenticated user',
  })
  @ApiResponse({ status: 200, description: 'Summary returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get('summary')
  async getSummary(@Req() req) {
    return this.transactionsService.getSummary(req.user.id);
  }

  @ApiOperation({ summary: 'Return a specific transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction returned successfully',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.transactionsService.findOne(id, req.user.id);
  }

  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiResponse({ status: 200, description: 'Transaction deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.transactionsService.remove(id, req.user.id);
  }
}
