import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { Order } from 'src/entities/orders.entity';

export class CreateUserDto {
  @ApiHideProperty()
  @IsOptional()
  id?: string;

  @ApiHideProperty()
  @IsOptional()
  orders?: Order[];

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiHideProperty()
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
