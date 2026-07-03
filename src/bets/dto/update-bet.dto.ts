import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { betStatus } from 'src/enum/betStatus.enum';

export class UpdateBetDto {
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

  @IsString()
  status: betStatus;
}
