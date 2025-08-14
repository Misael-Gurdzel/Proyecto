// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateUserDto } from 'src/users/dto/users.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get()
//   getAuth(): string {
//     return this.authService.getAuth();
//   }

//   @Post('signin')
//   async signIn(
//     @Body() credentials: { email: string; password: string },
//   ): Promise<{ message: string; token: string }> {
//     const { email, password } = credentials;
//     return this.authService.signIn(email, password);
//   }

//   @Post('signup')
//   async signUp(@Body() userDto: CreateUserDto) {
//     return this.authService.signUp(userDto);
//   }
// }
// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateUserDto } from 'src/users/dto/users.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get()
//   getAuth(): string {
//     return this.authService.getAuth();
//   }

//   @Post('signin')
//   async signIn(@Body() credentials: { email: string; password: string }) {
//     const { email, password } = credentials;
//     return await this.authService.signIn(email, password);
//   }

//   @Post('signup')
//   async signUp(@Body() userDto: CreateUserDto) {
//     return await this.authService.signUp(userDto);
//   }
// }

// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateUserDto } from 'src/users/dto/users.dto';
// import { User } from 'src/entities/user.entity';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get()
//   getAuth() {
//     return this.authService.getAuth();
//   }

//   @Post('signin')
//   async signIn(@Body() credentials: { email: string; password: string }) {
//     const { email, password } = credentials;
//     return await this.authService.signIn(email, password);
//   }

//   @Post('signup')
//   signUp(@Body() user: CreateUserDto) {
//     // Convertimos DTO a Partial<User>
//     const userData: Partial<User> = { ...user };
//     return this.authService.signUp(userData);
//   }

// @Post('signup')
// async signUp(@Body() user: CreateUserDto) {
//   return await this.authService.signUp(user);
// }
//}

// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateUserDto } from 'src/users/dto/users.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}
//   @Get()
//   getAuth() {
//     return this.authService.getAuth();
//   }

//   @Post('signin')
//   signIn(@Body() credentials: Promise<Credential>) {
//     const { email, password } = credentials;
//     return this.authService.signIn(email, password);
//   }

//   @Post('signup')
//   signUp(@Body() user: CreateUserDto) {
//     return this.authService.signUp(user);
//   }
// }
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth(): string {
    return this.authService.getAuth();
  }

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
}
