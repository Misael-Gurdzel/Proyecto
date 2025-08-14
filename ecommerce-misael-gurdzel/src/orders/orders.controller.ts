import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'src/entities/orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() body: { userId: string; products: { id: string }[] },
  ): Promise<Order> {
    try {
      return await this.ordersService.addOrder(body.userId, body.products);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<Order> {
    try {
      return await this.ordersService.getOrder(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to get order');
    }
  }
}

// import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// import { OrdersService } from './orders.service';

// @Controller('orders')
// export class OrdersController {
//   constructor(private readonly ordersService: OrdersService) {}

//   @Post()
//   addOrder(@Body() order: any) {
//     const { userId, products } = order;
//     returnthis.ordersService.addOrder(userId, products);
//   }

//   @Get(':id')
//   getOrder(@Param('id') id: string) {
//     return this.ordersService.getOrder(id);
//   }
// }
