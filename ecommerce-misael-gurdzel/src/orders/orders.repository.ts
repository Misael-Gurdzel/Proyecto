import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, MoreThan } from 'typeorm';
import { Order } from 'src/entities/orders.entity';
import { OrderDetail } from 'src/entities/order-details.entity';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async addOrder(userId: string, products: { id: string }[]): Promise<Order> {
    const user = await this.userRepo.findOne({ where: { id: String(userId) } });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    const availableProducts = await this.productRepo.find({
      where: { id: In(products.map((p) => p.id)), stock: MoreThan(0) },
    });

    if (availableProducts.length === 0)
      throw new NotFoundException('No products available');

    let total = 0;
    for (const product of availableProducts) {
      total += Number(product.price);
      product.stock -= 1;
      await this.productRepo.save(product);
    }

    const order = this.orderRepo.create({ user, total });
    await this.orderRepo.save(order);

    const orderDetails: OrderDetail[] = [];
    for (const product of availableProducts) {
      const detail = this.orderDetailRepo.create({
        order,
        product,
        price: product.price,
      });
      await this.orderDetailRepo.save(detail);
      orderDetails.push(detail);
    }

    order.orderDetails = orderDetails;
    return order;
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['user', 'orderDetails', 'orderDetails.product'],
    });
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    return await this.orderRepo.findOne({
      where: { id },
      relations: ['user', 'orderDetails'],
    });
  }

  //*esto es para obtener todas las ordenes
  // async getAllOrders(): Promise<Order[]> {
  //   return await this.orderRepo.find({
  //     relations: ['user', 'orderDetails', 'orderDetails.product'],
  //   });
  // }

  // async deleteOrder(id: string): Promise<void> {
  //   await this.orderRepo.delete(id);
  // }
}
