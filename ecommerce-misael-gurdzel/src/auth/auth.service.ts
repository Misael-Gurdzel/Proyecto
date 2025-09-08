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
      sub: foundUser.id,
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
