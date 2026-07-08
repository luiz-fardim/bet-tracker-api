import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Authenticate a user and return access token' })
  @ApiResponse({ status: 201, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  create(@Body() loginUserDto: LoginUserDto) {
    return this.authService.compare(loginUserDto.email, loginUserDto.password);
  }
}
