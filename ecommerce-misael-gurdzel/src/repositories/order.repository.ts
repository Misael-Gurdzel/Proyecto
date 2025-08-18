import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  async addOrder(
    userId: string,
    products: { id: string }[],
  ): Promise<Order | null> {
    const user = await this.userRepo.findOne({ where: { id: String(userId) } });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    const ids = products.map((p) => p.id);
    if (!ids.length) throw new BadRequestException('No products supplied');

    // solo productos con stock > 0
    const available = await this.productRepo.find({
      where: { id: In(ids), stock: MoreThan(0) },
      relations: ['category'],
    });
    if (available.length === 0)
      throw new NotFoundException('No products available');

    // calcular total y descontar stock
    let total = 0;
    for (const p of available) {
      total += Number(p.price);
      p.stock -= 1;
      await this.productRepo.save(p);
    }

    // crear orden
    const order = this.orderRepo.create({ user, total });
    await this.orderRepo.save(order);

    // detalles
    const details: OrderDetail[] = [];
    for (const p of available) {
      const d = this.orderDetailRepo.create({
        order,
        product: p,
        price: p.price,
      });
      await this.orderDetailRepo.save(d);
      details.push(d);
    }

    order.orderDetails = details;

    // devolver con detalle y productos
    return this.orderRepo.findOne({
      where: { id: order.id },
      relations: { user: true, orderDetails: { product: true } },
    });
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: { user: true, orderDetails: { product: true } },
    });
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }
}
