import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from 'src/entities/orders.entity';
//import { User } from 'src/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  addOrder(userId: string, products: { id: string }[]): Promise<Order> {
    return this.ordersRepository.addOrder(userId, products);
  }

  async getOrder(
    id: string,
    currentUser: { id: string; isAdmin: boolean },
  ): Promise<Order> {
    const order = await this.ordersRepository.getOrder(id);
    if (order.user.id === currentUser.id || currentUser.isAdmin) {
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      if (order.user.id !== currentUser.id && !currentUser.isAdmin) {
        throw new ForbiddenException(
          'You do not have permission to access this order',
        );
      }
    }
    return order;
  }
}
