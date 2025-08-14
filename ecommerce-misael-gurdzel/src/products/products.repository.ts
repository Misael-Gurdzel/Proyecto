import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async getProductById(id: string): Promise<Product> {
    const product = await this.repo.findOne({
      where: { id },
      relations: ['category', 'orderDetails'],
    });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async addProduct(product: Partial<Product>): Promise<Product> {
    const newProduct = this.repo.create(product);
    return await this.repo.save(newProduct);
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    await this.repo.update(id, product);
    return await this.getProductById(id);
  }

  async deleteProduct(id: string): Promise<Product> {
    const product = await this.getProductById(id);
    await this.repo.remove(product);
    return product;
  }
}

// import { Injectable, NotFoundException } from '@nestjs/common';
// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: boolean;
//   imgUrl: string;
// };

// @Injectable()
// export class ProductsRepository {
//   private products: Product[] = [];

//   async getProductById(id: number): Promise<Product> {
//     const numericId = Number(id);
//     const product = this.products.find((p) => p.id === numericId);
//     if (!product)
//       throw new NotFoundException(`Product with id ${id} not found`);
//     return product;
//   }

//   async addProduct(product: Product): Promise<Product> {
//     this.products.push(product);
//     return product;
//   }
//   async updateProduct(id: number, updated: Partial<Product>): promise<Product> {
//     const numericId = Number(id);
//     const index = this.products.findIndex((p) => p.id === numericId);
//     if (index === -1)
//       throw new NotFoundException(`Product with id ${id} not found`);

//     this.products[index] = { ...this.products[index], ...updated };
//     return this.products[index];
//   }
//   async deleteProduct(id: number): Promise<Product> {
//     const numericId = Number(id);
//     const index = this.products.findIndex((p) => p.id === numericId);
//     if (index === -1)
//       throw new NotFoundException(`Product with id ${id} not found`);

//     const deleted = this.products[index];
//     this.products.splice(index, 1);
//     return deleted;
//   }
// }
