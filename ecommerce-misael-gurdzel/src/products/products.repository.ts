import { Injectable } from '@nestjs/common';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for Product 1',
    price: 100,
    stock: true,
    imgUrl: 'https://example.com/product1.jpg',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description for Product 2',
    price: 200,
    stock: true,
    imgUrl: 'https://example.com/product2.jpg',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description for Product 3',
    price: 300,
    stock: false,
    imgUrl: 'https://example.com/product3.jpg',
  },
];

@Injectable()
export class ProductsRepository {
  async getProducts() {
    return await products;
  }
}
