import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from 'src/entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  addOrder(userId: string, products: { id: string }[]): Promise<Order> {
    return this.ordersRepository.addOrder(userId, products);
  }
  getOrder(id: string): Promise<Order> {
    return this.ordersRepository.getOrder(id);
  }
}
