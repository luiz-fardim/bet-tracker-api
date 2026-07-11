import { ApiProperty } from '@nestjs/swagger';

export class BetResponseDto {
  @ApiProperty({ description: 'Unique identifier of the bet' })
  id: string;

  @ApiProperty({ description: 'Odd value for the bet' })
  odd: number;

  @ApiProperty({ description: 'Name of the home team' })
  homeTeam: string;

  @ApiProperty({ description: 'Name of the visiting team' })
  visitingTeam: string;

  @ApiProperty({ description: 'Amount wagered on the bet' })
  value: number;

  @ApiProperty({ description: 'Betting market (e.g. Result, Goals, Corners)' })
  market: string;

  @ApiProperty({ description: 'Current status of the bet' })
  status: string;

  @ApiProperty({ description: 'Profit or loss from the bet', nullable: true })
  profit: number;

  @ApiProperty({ description: 'Date and time the bet was created' })
  createdAt: Date;
}
