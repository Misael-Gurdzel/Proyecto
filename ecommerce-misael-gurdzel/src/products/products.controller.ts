import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()
  addProduct(@Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() product: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }
}

// import {
//   Controller,
//   Get,
//   Post,
//   Put,
//   Delete,
//   Param,
//   Body,
//   HttpCode,
//   //UseGuards }
// } from '@nestjs/common';
// import { ProductsService } from './products.service';
// // import { AuthGuard } from '../auth/auth.guard'; // si estás usando guardias

// @Controller('products') // <-- ESTA LÍNEA ES OBLIGATORIA
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Get(':id')
//   // @UseGuards(AuthGuard)
//   getProduct(@Param('id') id: string) {
//     return this.productsService.getProductById(id);
//   }

//   @HttpCode(201)
//   @Post()
//   addProduct(@Body() product: any) {
//     return this.productsService.addProduct(product);
//   }

//   @Put(':id')
//   // @UseGuards(AuthGuard)
//   updateProduct(@Param('id') id: string, @Body() product: any) {
//     return this.productsService.updateProduct(id, product);
//   }

//   @Delete(':id')
//   // @UseGuards(AuthGuard)
//   deleteProduct(@Param('id') id: string) {
//     return this.productsService.deleteProduct(id);
//   }
// }
