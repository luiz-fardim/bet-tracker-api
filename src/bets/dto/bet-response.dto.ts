import { ApiProperty } from "@nestjs/swagger";

export class betResponseDto {
  @ApiProperty()
  odd: number;

  @ApiProperty()
  homeTeam: string;

  @ApiProperty()
  visitingTeam: string;
  
  @ApiProperty()
  value: number;
  
  @ApiProperty()
  market: string;
};
