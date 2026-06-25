import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { betStatus } from '../entities/bet.entity';

export class UpdateBetDto {
  @IsNumber()
  @IsPositive()
  odd: number;

  @IsString()
  @IsNotEmpty()
  homeTeam: string;

  @IsString()
  @IsNotEmpty()
  visitingTeam: string;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsString()
  @IsNotEmpty({ message: 'Market is required' })
  market: string;

  @IsString()
  status: betStatus;
}
