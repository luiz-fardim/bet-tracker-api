import { ApiProperty } from '@nestjs/swagger';

export class TransactionResponseDto {
  @ApiProperty({ description: 'Unique identifier of the transaction' })
  id: string;

  @ApiProperty({ description: 'Asset name' })
  assetName: string;

  @ApiProperty({ description: 'Asset type' })
  assetType: string;

  @ApiProperty({ description: 'Broker name', required: false })
  broker?: string;

  @ApiProperty({ description: 'Quantity of units' })
  quantity: number;

  @ApiProperty({ description: 'Buy price per unit' })
  buyPrice: number;

  @ApiProperty({ description: 'Sell price per unit', nullable: true })
  sellPrice?: number | null;

  @ApiProperty({ description: 'Fees paid' })
  fees: number;

  @ApiProperty({ description: 'Current transaction status' })
  status: string;

  @ApiProperty({ description: 'Calculated profit or loss', nullable: true })
  profit: number | null;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}
