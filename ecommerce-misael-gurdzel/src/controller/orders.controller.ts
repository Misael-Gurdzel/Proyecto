import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrderService } from '../service/orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body()
    body: {
      userId: string;
      products: { id: string }[];
    },
  ) {
    try {
      return await this.orderService.addOrder(body.userId, body.products);
    } catch (error) {
      console.error('Failed to create order:', error); // da igual
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    try {
      return await this.orderService.getOrder(id);
    } catch (error) {
      console.error('Failed to create order:', error); // da igual
      throw new InternalServerErrorException('Failed to get order');
    }
  }
}
