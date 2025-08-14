// import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
// import {
//   IsEmail,
//   IsEmpty,
//   IsNotEmpty,
//   IsNumber,
//   IsString,
//   Matches,
//   MaxLength,
//   MinLength,
//   Validate,
// } from 'class-validator';
// import { MatchPassword } from 'src/decorators/matchPassword.decorator';
// import { Order } from 'src/entities/orders.entity';

// export class CreateUserDto {
//   @ApiHideProperty()
//   @ApiHideProperty()
//   orders: Order[];

//   /**
//    *  Debe ser un string entre 3 y 50 caracteres
//    *  @example 'Test User 01'
//    */
//   @IsNotEmpty()
//   @IsString()
//   @MinLength(3)
//   @MaxLength(50)
//   name: string;

//   /**
//    * Debe ser un email de formato valido
//    * @example 'testuser01@test.com'
//    */
//   @IsNotEmpty({ message: 'el email no puede estar vacio' })
//   @MaxLength(50)
//   @IsEmail()
//   email: string;

//   /**
//    * Debe contener una mayuscula, una minuscula y u caracter especial, de entre 8 y 15 caracteres
//    * @example 'aaBB33##'
//    */
//   @IsNotEmpty()
//   @MinLength(10, {
//     message: 'La contraseña debe tener al menos 10 caracteres.',
//   })
//   @Matches(/.*[a-z].*/, {
//     message: 'La contraseña debe contener al menos una letra minúscula.',
//   })
//   @Matches(/.*[A-Z].*/, {
//     message: 'La contraseña debe contener al menos una letra mayúscula.',
//   })
//   @Matches(/.*\d.*/, {
//     message: 'La contraseña debe contener al menos un número.',
//   })
//   @Matches(/.*[!@#$%^&*()[\]{}\-_=+\\|;:'",.<>/?].*/, {
//     message: 'La contraseña debe contener al menos un carácter especial.',
//   })
//   @MaxLength(15)
//   password: string;

//   /**
//    * Debe ser igual al password
//    * @example 'aaBB33##'
//    */
//   @IsNotEmpty()
//   @Validate(MatchPassword, ['password'])
//   confirmPassword: string;

//   /**
//    * Debe tener entre 3 y o80 caracteres
//    * @example 'Test street'
//    */
//   @IsString()
//   @MinLength(3)
//   @MaxLength(80)
//   addres: string;
//   /**
//    * Debe ser un numero
//    * @example '123456789'
//    */
//   @IsNotEmpty()
//   @IsNumber()
//   phone: number;

//   /**
//    * Debe tener entre 5 y 20 caracteres
//    * @example 'Test Country'
//    */
//   @MinLength(5)
//   @MaxLength(20)
//   country: string;

//   /**
//    * Debe tener entre 5 y 20 caracteres
//    * @example 'Test City'
//    */
//   @MinLength(5)
//   @MaxLength(20)
//   city: string;

//   @ApiHideProperty()
//   @IsEmpty()
//   isAdmin: boolean;
// }

// export class UpdateUserDto extends PartialType(CreateUserDto) {
//   @ApiHideProperty()
//   id?: string;

//   @ApiHideProperty()
//   orders?: any[];

//   @IsString()
//   @MinLength(3)
//   @MaxLength(50)
//   name?: string;

//   @IsEmail()
//   @MaxLength(50)
//   email?: string;

//   @MinLength(10, {
//     message: 'La contraseña debe tener al menos 10 caracteres.',
//   })
//   @Matches(/.*[a-z].*/, {
//     message: 'La contraseña debe contener al menos una letra minúscula.',
//   })
//   @Matches(/.*[A-Z].*/, {
//     message: 'La contraseña debe contener al menos una letra mayúscula.',
//   })
//   @Matches(/.*\d.*/, {
//     message: 'La contraseña debe contener al menos un número.',
//   })
//   @Matches(/.*[!@#$%^&*()[\]{}\-_=+\\|;:'",.<>/?].*/, {
//     message: 'La contraseña debe contener al menos un carácter especial.',
//   })
//   @MaxLength(15)
//   password?: string;

//   @IsString()
//   @MinLength(3)
//   @MaxLength(80)
//   address?: string;

//   @IsNumber()
//   phone?: number;

//   @MinLength(5)
//   @MaxLength(20)
//   country?: string;

//   @MinLength(5)
//   @MaxLength(20)
//   city?: string;

//   @ApiHideProperty()
//   @IsEmpty()
//   isAdmin?: boolean;
// }

// export class LoginUserDto {
//   /**
//    * Email válido del usuario
//    * @example 'usuario@test.com'
//    */
//   @ApiProperty({ example: 'usuario@test.com' })
//   @IsNotEmpty({ message: 'El email es obligatorio.' })
//   @IsEmail({}, { message: 'El email debe tener un formato válido.' })
//   @MaxLength(50)
//   email: string;

//   /**
//    *Debe ser igual la password
//    * @example 'aaBB33##'
//    */
//   @ApiProperty({ example: 'Aa123456!!' })
//   @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
//   @MinLength(10, {
//     message: 'La contraseña debe tener al menos 10 caracteres.',
//   })
//   @Matches(/.*[a-z].*/, {
//     message: 'La contraseña debe contener al menos una letra minúscula.',
//   })
//   @Matches(/.*[A-Z].*/, {
//     message: 'La contraseña debe contener al menos una letra mayúscula.',
//   })
//   @Matches(/.*\d.*/, {
//     message: 'La contraseña debe contener al menos un número.',
//   })
//   @Matches(/.*[!@#$%^&*()[\]{}\-_=+\\|;:'",.<>/?].*/, {
//     message: 'La contraseña debe contener al menos un carácter especial.',
//   })
//   @MaxLength(15)
//   password: string;
// }
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
  id?: string;

  @ApiHideProperty()
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
