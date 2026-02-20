import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.service.getCategories();
  }

  @Post('seed')
  async addCategories() {
    return await this.service.addCategories();
  }
  //*agregar el estado de activo
  // @Get('active')
  // async getIsActive() {
  //   return await this.service.getIsActive();
  // }
  //*este es para desactivar una categoria
  // @Patch(':id')
  // async desactivarCategoria(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return await this.service.desactivarCategoria(id);
  // }
}
// @Put(':id')
// @HttpCode(HttpStatus.OK)
// async updateCategoryName(
//   @Param('id', new ParseUUIDPipe()) id: string,
//   @Body() body: UpdateCategoryNameDto,
// ) {
//   if (!body.name || body.name.trim().length === 0) {
//     throw new BadRequestException('El nombre no puede estar vacío');
//   }
//   return await this.service.updateCategoryName(id, body.name);
// }

//*este es para obtener el total de precios
// @Get('average-price/:id')
// async getProductPrecio(@Param('id') id: string) {
//   return await this.service.getProductPrecio(id);
// }

//*Este es para obtener una categoria con su nombre y total de productos
// @Get('count-products')
// async countProducts(@Query('id') id: string) {
//   return await this.service.countProducts(id);
// }

//*eliminar por nombre
// @Delete('by-name')
// async deleteCategory(@Query('name') name: string) {
//   return await this.service.deleteCategory(name);
// }

// @Get(':id')
// async getCategory(@Param('id', new ParseUUIDPipe()) id: string) {
//   return await this.service.getCategory(id);
// }

// @Get('ByName')
// async getCategoryByName(@Query('name') name: string) {
//   return await this.service.getCategoryByName(name);
// }
