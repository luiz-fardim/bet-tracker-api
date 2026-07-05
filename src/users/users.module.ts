import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/authorization/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule { }
