import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TransactionStatusEnum } from 'src/enum/transactionStatus.enum';

export class FindTransactionDto {
  @ApiProperty({
    description: 'Filter transactions by status',
    enum: TransactionStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(TransactionStatusEnum)
  status: TransactionStatusEnum;
}
