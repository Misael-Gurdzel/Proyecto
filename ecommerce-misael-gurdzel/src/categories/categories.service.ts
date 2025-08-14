import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import data from '../utils/data.json';

interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
  addcategory() {
    return this.categoriesRepository.getCategories();
  }

  async addCategories() {
    const products = data as ProductData[];
    if (!Array.isArray(products)) {
      throw new Error('Invalid data format');
    }
    const uniqueCategories = new Set<string>();

    for (const product of products) {
      uniqueCategories.add(product.category);
    }

    for (const categoryName of uniqueCategories) {
      await this.categoriesRepository.addCategoryIfNotExists(categoryName);
    }

    return { message: 'Categorías precargadas correctamente' };
  }
}
