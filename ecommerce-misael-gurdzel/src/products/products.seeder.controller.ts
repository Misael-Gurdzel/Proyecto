import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/products.entity';
import { Category } from 'src/entities/categories.entity';
import { PRODUCTS_DATA } from '../database/products.data';

@Controller('products')
export class ProductsSeederController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  @Get('seeder')
  @HttpCode(HttpStatus.OK)
  async seed() {
    for (const p of PRODUCTS_DATA) {
      const exists = await this.productRepo.findOne({
        where: { name: p.name },
      });
      if (exists) continue;

      let category = await this.categoryRepo.findOne({
        where: { name: p.categoryName },
      });
      if (!category) {
        category = this.categoryRepo.create({ name: p.categoryName });
        await this.categoryRepo.save(category);
      }

      const entity = this.productRepo.create({
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        imgUrl: p.imgUrl || undefined,
        category,
      });
      await this.productRepo.save(entity);
    }
    return { message: 'Productos precargados correctamente' };
  }
}
