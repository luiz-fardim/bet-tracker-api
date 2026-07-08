import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @ApiProperty({ 
  description: 'Number of items per page', 
  required: false,
  example: 10
})
  limit: number;

  @IsOptional()
  @ApiProperty({ 
  description: 'Page number', 
  required: false,
  example: 1
})
  page: number;
}
