import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { betStatus } from 'src/enum/betStatus.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBetDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  @ApiProperty()
  odd: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  homeTeam: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  visitingTeam: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  @ApiProperty()
  value: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty({ message: 'Market is required' })
  market: string;

  @IsString()
  @ApiProperty()
  status: betStatus;
}
