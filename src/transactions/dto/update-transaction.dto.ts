import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { AssetTypeEnum } from 'src/enum/assetType.enum';
import { TransactionStatusEnum } from 'src/enum/transactionStatus.enum';

export class UpdateTransactionDto {
  @ApiProperty({
    example: 'PETR4',
    description: 'Updated asset name',
    required: false,
  })
  @IsOptional()
  @IsString()
  assetName?: string;

  @ApiProperty({
    enum: AssetTypeEnum,
    description: 'Updated asset type',
    required: false,
  })
  @IsOptional()
  @IsEnum(AssetTypeEnum)
  assetType?: AssetTypeEnum;

  @ApiProperty({
    example: 'Nubank',
    description: 'Updated broker name',
    required: false,
  })
  @IsOptional()
  @IsString()
  broker?: string;

  @ApiProperty({
    example: 10,
    description: 'Updated quantity',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @ApiProperty({
    example: 20.5,
    description: 'Updated buy price',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  buyPrice?: number;

  @ApiProperty({
    example: 23,
    description: 'Updated sell price to close the transaction',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  sellPrice?: number | null;

  @ApiProperty({ example: 0, description: 'Updated fees', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  fees?: number;

  @ApiProperty({
    enum: TransactionStatusEnum,
    example: TransactionStatusEnum.CLOSED,
    description: 'Update transaction status',
    required: false,
  })
  @IsOptional()
  @IsEnum(TransactionStatusEnum)
  status?: TransactionStatusEnum;
}
