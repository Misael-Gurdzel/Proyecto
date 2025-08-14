import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/orders.entity';
import { OrderDetail } from 'src/entities/order-details.entity';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepo: Repository<OrderDetail>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
  ) {}

  async addOrder(
    userId: string,
    products: { id: string }[],
  ): Promise<Order | null> {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error(`User with id ${userId} not found`);

    const order = this.ordersRepo.create({ user, date: new Date() });
    const newOrder = await this.ordersRepo.save(order);

    const orderDetails: OrderDetail[] = [];

    for (const p of products) {
      const product = await this.productsRepo.findOne({ where: { id: p.id } });
      if (!product) throw new Error(`Product with id ${p.id} not found`);

      await this.productsRepo.update(p.id, { stock: product.stock - 1 });

      const detail = this.orderDetailsRepo.create({
        order: newOrder,
        product,
        price: product.price,
      });
      orderDetails.push(detail);
    }

    await this.orderDetailsRepo.save(orderDetails);

    return this.ordersRepo.findOne({
      where: { id: newOrder.id },
      relations: { orderDetails: { product: true }, user: true },
    });
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.ordersRepo.findOne({
      where: { id },
      relations: { orderDetails: { product: true }, user: true },
    });
    if (!order) throw new Error(`Order with id ${id} not found`);
    return order;
  }
}

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, In, MoreThan } from 'typeorm';
// import { Order } from '../entities/orders.entity';
// import { User } from '../entities/user.entity';
// import { Product } from '../entities/products.entity';
// import { OrderDetail } from '../entities/order-details.entity';

// @Injectable()
// export class OrderRepository {
//   constructor(
//     @InjectRepository(Order)
//     private readonly orderRepo: Repository<Order>,
//     @InjectRepository(User)
//     private readonly userRepo: Repository<User>,
//     @InjectRepository(Product)
//     private readonly productRepo: Repository<Product>,
//     @InjectRepository(OrderDetail)
//     private readonly orderDetailRepo: Repository<OrderDetail>,
//   ) {}

//   async addOrder(userId: number, products: { id: number }[]): Promise<Order> {
//     // Buscar usuario
//     const user = await this.userRepo.findOne({ where: { id: userId } });
//     if (!user) throw new Error('User not found');

//     //*creamos la orden
//     // const order = new Orders()
//     // order.date = new Date();
//     // order.user = user; const newOrder = await this.ordersRepository.save(order)

//     // Buscar productos con stock > 0
//     const availableProducts = await this.productRepo.find({
//       where: {
//         id: In(products.map((p) => p.id)),
//         stock: MoreThan(0),
//       },
//     });

//     if (availableProducts.length === 0)
//       throw new Error('No products available');

//     let total = 0;

//     // Descontar stock y calcular total
//     for (const product of availableProducts) {
//       total += Number(product.price);
//       product.stock -= 1;
//       await this.productRepo.save(product);
//     }

//     // Crear order
//     const order = this.orderRepo.create({
//       user: user,
//       total: total,
//     });
//     await this.orderRepo.save(order);

//     // Crear detalles de la orden
//     const orderDetails: OrderDetail[] = [];
//     for (const product of availableProducts) {
//       const detail = this.orderDetailRepo.create({
//         order: order,
//         product: product,
//         price: product.price,
//       });
//       await this.orderDetailRepo.save(detail);
//       orderDetails.push(detail);
//     }

//     // Devolver order con detalles
//     order.orderDetails = orderDetails;
//     return order;
//   }

//   async getOrder(orderId: number): Promise<Order> {
//     const order = await this.orderRepo.findOne({
//       where: { id: orderId as unknown as string },
//       relations: ['orderDetails', 'orderDetails.product', 'user'],
//     });

//     if (!order) throw new Error('Order not found');

//     return order;
//   }

//   productsArray = Promise.all(
//     this.productsArray.map(async (element) => {
//       const product = await this.productRepo.findOneBy({
//         id: element.id,
//       });
//       if (!product) {
//         throw new NotFoundException(`Product with id ${element.id} not found`);
//         return;
//       }
//     }),
//   );
// }
