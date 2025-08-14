// import { BadRequestException, Injectable } from '@nestjs/common';
// import { UsersRepository } from 'src/users/users.repository';
// import { User } from 'src/entities/user.entity';
// import { CreateUserDto } from 'src/users/dto/users.dto';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersRepository: UsersRepository,
//     private readonly jwtService: JwtService,
//   ) {}

//   getAuth(): string {
//     return 'Authentication service running';
//   }

//   //* LOGIN
//   async signIn(
//     email: string,
//     password: string,
//   ): Promise<{ message: string; token: string }> {
//     if (!email || !password) {
//       throw new BadRequestException('Se necesita email y password');
//     }

//     const foundUser: User | undefined =
//       this.usersRepository.getUserByEmail(email);
//     if (!foundUser) throw new BadRequestException('Credenciales incorrectas');

//     const validPassword = await bcrypt.compare(password, foundUser.password);
//     if (!validPassword)
//       throw new BadRequestException('Credenciales incorrectas');

//     const payload = {
//       id: foundUser.id,
//       email: foundUser.email,
//       isAdmin: foundUser.isAdmin,
//     };

//     const token = this.jwtService.sign(payload);

//     return {
//       message: 'Usuario logueado correctamente',
//       token,
//     };
//   }

//   //* SIGNUP
//   async signUp(userDto: CreateUserDto): Promise<User> {
//     const { email, password } = userDto;

//     if (!email || !password) {
//       throw new BadRequestException('Se necesita email y password');
//     }

//     const existingUser = this.usersRepository.getUserByEmail(email);
//     if (existingUser) throw new BadRequestException('Email ya registrado');

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser: Partial<User> = {
//       ...userDto,
//       password: hashedPassword,
//     };

//     return this.usersRepository.addUser(newUser);
//   }
// }
// // import { BadRequestException, Injectable } from '@nestjs/common';
// // import { UsersRepository } from 'src/users/users.repository';
// // import { User } from 'src/entities/user.entity';
// // import { CreateUserDto } from 'src/users/dto/users.dto';
// // import * as bcrypt from 'bcrypt';
// // import { JwtService } from '@nestjs/jwt';

// // @Injectable()
// // export class AuthService {
// //   constructor(
// //     private readonly usersRepository: UsersRepository,
// //     private readonly jwtService: JwtService,
// //   ) {}

// //   getAuth(): string {
// //     return 'Authentication service running';
// //   }

// //   //* LOGIN
// //   async signIn(
// //     email: string,
// //     password: string,
// //   ): Promise<{ message: string; token: string }> {
// //     if (!email || !password) {
// //       throw new BadRequestException('Se necesita email y password');
// //     }

// //     // ⚡ Corregido: await para obtener el usuario
// //     const foundUser: User | undefined = await this.usersRepository.getUserByEmail(email);
// //     if (!foundUser) throw new BadRequestException('Credenciales incorrectas');

// //     const validPassword = await bcrypt.compare(password, foundUser.password);
// //     if (!validPassword)
// //       throw new BadRequestException('Credenciales incorrectas');

// //     const payload = {
// //       id: foundUser.id,
// //       email: foundUser.email,
// //       isAdmin: foundUser.isAdmin,
// //     };

// //     const token = this.jwtService.sign(payload);

// //     return {
// //       message: 'Usuario logueado correctamente',
// //       token,
// //     };
// //   }

// //   //* SIGNUP
// //   async signUp(userDto: CreateUserDto): Promise<User> {
// //     const { email, password } = userDto;

// //     if (!email || !password) {
// //       throw new BadRequestException('Se necesita email y password');
// //     }

// //     // ⚡ Corregido: await para verificar existencia
// //     const existingUser = await this.usersRepository.getUserByEmail(email);
// //     if (existingUser) throw new BadRequestException('Email ya registrado');

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser: Partial<User> = {
// //       ...userDto,
// //       password: hashedPassword,
// //     };

// //     // ⚡ Corregido: await para agregar usuario
// //     return await this.usersRepository.addUser(newUser as User);
// //   }
// // }

// // import { BadRequestException, Injectable } from '@nestjs/common';
// // import { UsersRepository } from 'src/users/users.repository';
// // import { User } from 'src/entities/user.entity';
// // import { CreateUserDto } from 'src/users/dto/users.dto';
// // import * as bcrypt from 'bcrypt';
// // import { JwtService } from '@nestjs/jwt';

// // @Injectable()
// // export class AuthService {
// //   constructor(
// //     private readonly usersRepository: UsersRepository,
// //     private readonly jwtService: JwtService,
// //   ) {}

// //   getAuth(): string {
// //     return 'Authentication service running';
// //   }

// //   //* LOGIN
// //   async signIn(
// //     email: string,
// //     password: string,
// //   ): Promise<{ message: string; token: string }> {
// //     if (!email || !password) {
// //       throw new BadRequestException('Se necesita email y password');
// //     }

// //     const foundUser: User = this.usersRepository.getUserByEmail(email);
// //     if (!foundUser) throw new BadRequestException('Credenciales incorrectas');

// //     const validPassword = await bcrypt.compare(password, foundUser.password);
// //     if (!validPassword)
// //       throw new BadRequestException('Credenciales incorrectas');

// //     const payload = {
// //       id: foundUser.id,
// //       email: foundUser.email,
// //       isAdmin: foundUser.isAdmin,
// //     };

// //     const token = this.jwtService.sign(payload);

// //     return {
// //       message: 'Usuario logueado correctamente',
// //       token,
// //     };
// //   }

// //   //* SIGNUP
// //   async signUp(userDto: CreateUserDto): Promise<User> {
// //     const { email, password } = userDto;

// //     if (!email || !password) {
// //       throw new BadRequestException('Se necesita email y password');
// //     }

// //     const existingUser = this.usersRepository.getUserByEmail(email);
// //     if (existingUser) throw new BadRequestException('Email ya registrado');

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser: Partial<User> = {
// //       ...userDto,
// //       password: hashedPassword,
// //     };

// //     return this.usersRepository.addUser(newUser);
// //   }
// // }

// // // import { Injectable } from '@nestjs/common';
// // // import { JwtService } from '@nestjs/jwt';
// // // import { User } from 'src/entities/user.entity';
// // // import { UsersRepository } from 'src/users/users.repository';

// // // @Injectable()
// // // export class AuthService {
// // //   constructor(
// // //     private readonly usersRepository: UsersRepository,
// // //     private readonly jwtService: JwtService,
// // //   ) {}

// // //   getAuth() {
// // //     return 'Authentication working';
// // //   }

// // //   async signIn(email: string, password: string) {
// // //     const foundUser = await this.usersRepository.getUserByEmail(email);
// // //     if (!foundUser) throw new BadRequestException('Incorrect credentials');

// // //     const validPassword = await bcrypt.compare(password, foundUser.password);
// // //     if (!validPassword) throw new BadRequestException('Incorrect credentials');

// // //     const payload = {
// // //       id: foundUser.id,
// // //       email: foundUser.email,
// // //       isAdmin: foundUser.isAdmin,
// // //     };

// // //     const token = this.jwtService.sign(payload, { secret: ENV.JWT_SECRET });

// // //     return { message: 'User logged in', token };
// // //   }

// // //   async signUp(user: Partial<User>) {
// // //     const { email, password } = user;
// // //     if (!email || !password)
// // //       throw new BadRequestException('Email and password required');

// // //     const foundUser = await this.usersRepository.getUserByEmail(email);
// // //     if (foundUser) throw new BadRequestException('Email already registered');

// // //     const hashedPassword = await bcrypt.hash(password, 10);

// // //     return await this.usersRepository.addUser({
// // //       ...user,
// // //       password: hashedPassword,
// // //     });
// // //   }
// // // }

import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth(): string {
    return 'Authentication service running';
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ message: string; token: string }> {
    if (!email || !password) {
      throw new BadRequestException('Se necesita email y password');
    }

    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (!foundUser) throw new BadRequestException('Credenciales incorrectas');

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword)
      throw new BadRequestException('Credenciales incorrectas');

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario logueado correctamente',
      token,
    };
  }

  async signUp(userDto: CreateUserDto): Promise<User> {
    const { email, password, confirmPassword } = userDto;

    if (!email || !password || !confirmPassword) {
      throw new BadRequestException(
        'Se necesita email, password y confirmación',
      );
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const existingUser = await this.usersRepository.getUserByEmail(email);
    if (existingUser) throw new BadRequestException('Email ya registrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: Partial<User> = {
      ...userDto,
      password: hashedPassword,
    };

    return this.usersRepository.addUser(newUser);
  }
}
