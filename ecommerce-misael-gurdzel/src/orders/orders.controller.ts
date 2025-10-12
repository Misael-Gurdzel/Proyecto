import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  InternalServerErrorException,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'src/entities/orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(AuthGuard) // protegidos por token
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() body: CreateOrderDto): Promise<Order> {
    try {
      return await this.ordersService.addOrder(body.userId, body.products);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req,
  ): Promise<Order> {
    try {
      return await this.ordersService.getOrder(id, req.user);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to get order');
    }
  }
}
