// import { Injectable } from '@nestjs/common';
// import { ProductsRepository } from './products.repository';
// import { Product } from 'src/entities/products.entity';

// @Injectable()
// export class ProductsService {
//   constructor(private readonly productsRepository: ProductsRepository) {}

//   getProductById(id: string): Promise<Product> {
//     return this.productsRepository.getProductById(id);
//   }

//   addProduct(product: Partial<Product>): Promise<Product> {
//     return this.productsRepository.addProduct(product);
//   }

//   updateProduct(id: string, product: Partial<Product>): Promise<Product> {
//     return this.productsRepository.updateProduct(id, product);
//   }

//   deleteProduct(id: string): Promise<Product> {
//     return this.productsRepository.deleteProduct(id);
//   }
// }

// src/products/products.service.ts (agregar list + create con categoryId)
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    return this.productsRepository.getProducts(page, limit);
  }

  getProductById(id: string): Promise<Product> {
    return this.productsRepository.getProductById(id);
  }

  async addProduct(
    product: Partial<Product> & { categoryId: string },
  ): Promise<Product> {
    const category = await this.categoryRepo.findOne({
      where: { id: product.categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');
    return this.productsRepository.addProduct({ ...product, category });
  }

  updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduct(id: string): Promise<Product> {
    return this.productsRepository.deleteProduct(id);
  }
}
