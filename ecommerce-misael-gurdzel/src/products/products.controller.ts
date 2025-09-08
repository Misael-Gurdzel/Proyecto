import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/entities/products.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../products/dto/Products.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorators';
import { Role } from 'src/auth/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // públicos
  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<Product[]> {
    return this.productsService.getProducts(Number(page), Number(limit));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  // protegidos
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  addProduct(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.addProduct(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin) // control de acceso
  @HttpCode(HttpStatus.OK)
  updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  async deleteProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<{ id: string }> {
    await this.productsService.deleteProduct(id);
    return { id };
  }
}
