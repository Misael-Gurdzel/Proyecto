import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repositories/order.repository';
import { Order } from '../entities/orders.entity';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrdersRepository) {}

  async addOrder(
    userId: string,
    products: { id: string }[],
  ): Promise<Order | null> {
    return this.orderRepository.addOrder(userId, products);
  }

  async getOrder(orderId: string): Promise<Order> {
    return this.orderRepository.getOrder(orderId);
  }
  // async addOrder(
  //   userId: string,
  //   products: { id: string }[],
  // ): Promise<Order | null> {
  //   const UserId = Number(userId);
  //   const numericProducts = products.map((product) => ({
  //     id: Number(product.id),
  //   }));
  //   return this.orderRepository.addOrder(UserId, numericProducts);
  // }

  // async getOrder(orderId: string): Promise<Order> {
  //   const numericOrderId = Number(orderId);
  //   return this.orderRepository.getOrder(orderId);
  // }
}
