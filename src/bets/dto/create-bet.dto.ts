import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBetDto {
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
}
