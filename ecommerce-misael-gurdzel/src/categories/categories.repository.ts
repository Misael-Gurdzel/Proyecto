import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.repo.find();
  }

  async addCategoryIfNotExists(name: string): Promise<Category> {
    let category = await this.repo.findOne({ where: { name } });
    if (!category) {
      category = this.repo.create({ name });
      await this.repo.save(category);
    }
    return category;
  }
}
