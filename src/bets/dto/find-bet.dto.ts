import { IsEnum, IsOptional } from 'class-validator';
import { betStatus } from 'src/enum/betStatus.enum';

export class FindBetDto {
  @IsOptional()
  @IsEnum(betStatus)
  status: betStatus;
}
