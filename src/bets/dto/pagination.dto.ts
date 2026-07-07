import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @ApiProperty()
  page: number;
}
