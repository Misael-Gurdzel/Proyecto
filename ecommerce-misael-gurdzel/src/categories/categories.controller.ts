import { Controller, Get, Post } from '@nestjs/common';
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
}
