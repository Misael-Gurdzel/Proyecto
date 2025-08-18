// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateUserDto, LoginDto } from 'src/users/dto/users.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get()
//   getAuth(): string {
//     return this.authService.getAuth();
//   }

//   @Post('signup')
//   signUp(@Body() createUserDto: CreateUserDto) {
//     return this.authService.signUp(createUserDto);
//   }

//   @Post('signin')
//   signIn(@Body() loginDto: LoginDto) {
//     return this.authService.signIn(loginDto.email, loginDto.password);
//   }
// }
// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from 'src/users/dto/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth(): string {
    return this.authService.getAuth();
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
}
