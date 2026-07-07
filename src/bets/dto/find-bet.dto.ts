import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { betStatus } from 'src/enum/betStatus.enum';

export class FindBetDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(betStatus)
  status: betStatus;
}
