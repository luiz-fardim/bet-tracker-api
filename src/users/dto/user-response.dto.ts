import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enum/role.enum';

export class UserResponseDto {
  @ApiProperty({ description: 'Unique identifier of the user' })
  id: string;

  @ApiProperty({ description: 'User full name' })
  name: string;

  @ApiProperty({ description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'Date and time the user was created' })
  createdAt: Date;

  @ApiProperty({ description: 'User birth date' })
  birth: string;

  @ApiProperty({ description: 'User role', enum: Role })
  role: Role;
}
