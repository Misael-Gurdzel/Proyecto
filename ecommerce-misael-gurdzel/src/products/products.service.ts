import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/categories.entity';
import { CreateProductDto } from './dto/Products.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    return this.productsRepository.getProducts(page, limit);
  }

  getProductById(id: string): Promise<Product> {
    return this.productsRepository.getProductById(id);
  }

  async addProduct(dto: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');
    return this.productsRepository.addProduct({ ...dto, category });
  }

  updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduct(id: string): Promise<Product> {
    return this.productsRepository.deleteProduct(id);
  }
}
