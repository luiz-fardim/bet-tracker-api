import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { betStatus } from 'src/enum/betStatus.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBetDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  @ApiProperty({ description: 'Odd value for the bet' })
  odd: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the home team' })
  homeTeam: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the visiting team' })
  visitingTeam: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ description: 'Amount wagered on the bet' })
  @ApiProperty()
  value: number;

  @IsString()
  @ApiProperty({ description: 'Betting market (e.g. Result, Goals, Corners)' })
  @IsNotEmpty({ message: 'Market is required' })
  market: string;

  @IsString()
  @ApiProperty({ 
  description: 'Filter bets by status', 
  enum: betStatus,
  required: false 
})
  status: betStatus;
}
