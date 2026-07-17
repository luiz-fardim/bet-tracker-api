import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { AssetTypeEnum } from 'src/enum/assetType.enum';

export class CreateTransactionDto {
  @ApiProperty({
    example: 'PETR4',
    description: 'Name of the asset or investment',
  })
  @IsString()
  @IsNotEmpty()
  assetName: string;

  @ApiProperty({
    enum: AssetTypeEnum,
    example: AssetTypeEnum.STOCK,
    description: 'Type of investment asset',
  })
  @IsEnum(AssetTypeEnum)
  assetType: AssetTypeEnum;

  @ApiProperty({
    example: 'Nubank',
    description: 'Broker or platform name',
    required: false,
  })
  @IsOptional()
  @IsString()
  broker?: string;

  @ApiProperty({ example: 10, description: 'Quantity of units or shares' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ example: 20.5, description: 'Buy price per unit' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  buyPrice: number;

  @ApiProperty({
    example: null,
    description: 'Sell price per unit, if already closed',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  sellPrice?: number | null;

  @ApiProperty({ example: 0, description: 'Transaction fees', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  fees?: number;
}
