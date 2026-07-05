import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async compare(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return await this.generateToken(user);
  }
  async generateToken(payload: User) {
    return {
      access_token: this.jwtService.sign(
        {
          email: payload.email,
          id: payload.id,
          role: payload.role
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      ),
    };
  }
}
