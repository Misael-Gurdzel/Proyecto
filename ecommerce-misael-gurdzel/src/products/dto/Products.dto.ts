import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
  Min,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
