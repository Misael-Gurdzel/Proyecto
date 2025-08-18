import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/orders.entity';
import { OrderDetail } from '../entities/order-details.entity';
import { Product } from '../entities/products.entity';
import { User } from '../entities/user.entity';
import { OrderService } from '../service/orders.service';
import { OrdersController } from '../orders/orders.controller';
import { OrdersRepository } from '../repositories/order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, User])],
  controllers: [OrdersController],
  providers: [OrderService, OrdersRepository],
  exports: [OrderService],
})
export class OrderModule {}
