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
}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { OrderDetail } from 'src/entities/order-details.entity';
// import { Order } from 'src/entities/orders.entity';
// import { Product } from 'src/entities/products.entity';
// import { User } from 'src/entities/user.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class OrdersRepository {
//   constructor(
//     @InjectRepository(Order)
//     private ordersRepository: Repository<Order>,
//     @InjectRepository(OrderDetail)
//     private orderDetailRepository: Repository<OrderDetail>,
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//     @InjectRepository(Product)
//     private productsRepository: Repository<Product>,
//   ) {}

//   async addOrder(userId: string, products: Promise<Order>) {
//     let total = 0;

//     // Verify if user exists
//     const user = await this.usersRepository.findOneBy({ id: userId });
//     if (!user) {
//       return `User whit id ${userId} not found`;
//     }

//     // Create the order
//     const order = new Order();
//     order.date = new Date();
//     order.user = user;

//     const newOrder = await this.ordersRepository.save(order);

//     // Associate every "id" we recive with the "product"
//     const productsArray = await Promise.all(
//       products.map(async (element) => {
//         const product = await this.productsRepository.findOneBy({
//           id: element.id,
//         });
//         if (!product) {
//           return `Product with id ${element.id} not found`;
//         }
//         //calculate total
//         total += Number(product.price);
//         //Actualize stock
//         await this.productsRepository.update(
//           { id: element.id },
//           { stock: product.stock - 1 },
//         );

//         return product;
//       }),
//     );

//     //Calculamos el otal de forma segura:
//     const total = productsArray.reduce(
//       (sum, products) => sum + Number(products.price),
//       0,
//     );

//     // Create order details and insert into DB
//     const orderDetail = new OrderDetail();
//     orderDetail.price = Number(Number(total).toFixed(2));
//     orderDetail.product = productsArray;
//     orderDetail.order = newOrder;
//     await this.orderDetailRepository.save(orderDetail);

//     // Send the customer the purchase with the producst information:
//     return await this.ordersRepository.find({
//       where: { id: newOrder.id },
//       relations: {
//         orderDetails: true,
//       },
//     });
//   }

//   getOrder(id: string) {
//     const order = this.ordersRepository.findOne({
//       where: { id },
//       relations: {
//         orderDetails: {
//           product: true,
//         },
//       },
//     });
//     if (!order) {
//       return `Order with id ${id} not found`;
//     }
//     return order;
//   }
// }
