import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer'
console.log("passou do dto")

export class CreateBetDto {

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  odd: number;

  @IsString()
  @IsNotEmpty()
  homeTeam: string;

  @IsString()
  @IsNotEmpty()
  visitingTeam: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  value: number;

  @IsString()
  @IsNotEmpty({ message: 'Market is required' })
  market: string;

  userId: string
}
