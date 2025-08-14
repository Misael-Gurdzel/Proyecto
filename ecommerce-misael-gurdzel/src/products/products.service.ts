import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProductById(id: string): Promise<Product> {
    return this.productsRepository.getProductById(id);
  }

  addProduct(product: Partial<Product>): Promise<Product> {
    return this.productsRepository.addProduct(product);
  }

  updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduct(id: string): Promise<Product> {
    return this.productsRepository.deleteProduct(id);
  }
}

// import { Injectable } from '@nestjs/common';
// import { ProductsRepository } from './products.repository';
// import { Product } from 'src/entities/products.entity';

// @Injectable()
// export class ProductsService {
//   constructor(private readonly productsRepository: ProductsRepository) {}

//   getProductById(id: number): Promise<Product> {
//     return this.productsRepository.getProductById(id);
//   }

//   addProduct(product: Product): Promise<Product> {
//     return this.productsRepository.addProduct(product);
//   }

//   updateProduct(id: number, product: Partial<Product>): Promise<Product> {
//     return this.productsRepository.updateProduct(id, product);
//   }

//   deleteProduct(id: number): Promise<Product> {
//     return this.productsRepository.deleteProduct(id);
//   }
// }
