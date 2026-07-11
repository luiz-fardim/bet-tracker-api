import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { betStatus } from 'src/enum/betStatus.enum';

export class FindBetDto {
  @ApiProperty({
    description: 'Filter bets by status',
    enum: betStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(betStatus)
  status: betStatus;
}
