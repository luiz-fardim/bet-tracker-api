import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBetDto {
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
  @IsPositive()
  @ApiProperty({ description: 'Amount wagered on the bet' })
  value: number;

  @IsString()
  @IsNotEmpty({ message: 'Market is required' })
  @ApiProperty({ description: 'Betting market (e.g. Result, Goals, Corners)' })
  market: string;
}
