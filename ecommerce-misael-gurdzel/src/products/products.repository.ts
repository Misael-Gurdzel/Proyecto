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

  async getProducts(page: number, limit: number): Promise<Product[]> {
    const skip = (page - 1) * limit;
    return this.repo.find({
      skip,
      take: limit,
      relations: ['category'],
      order: { name: 'ASC' },
    });
  }

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

  async existsByName(name: string): Promise<boolean> {
    return !!(await this.repo.findOne({ where: { name } }));
  }

  async increaseProduct(id: string): Promise<Product | null> {
    return await this.getProductById(id);
  }
}
