import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.service.getCategories();
  }

  @Get('add-seeder')
  addCategories() {
    return this.service.addCategories();
  }
}
