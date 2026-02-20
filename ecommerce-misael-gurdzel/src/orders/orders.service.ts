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

//*esto es para obtener todas las ordenes
// async getAllOrders(): Promise<Order[]> {
//   return await this.ordersRepository.getAllOrders();
// }
// async deleteOrder(id: string): Promise<{ message: string }> {
//    1️⃣ Buscar la orden
//   const order = await this.ordersRepository.findById(id);

//   if (!order) {
//     throw new NotFoundException('No se encontró la orden');
//   }

//    2️⃣ Simulamos obtener el usuario autenticado (por ahora)
//   const loggedUser = { id: order.user.id, isAdmin: false }; // <- ejemplo temporal

//    3️⃣ Verificar permisos
//   if (order.user.id !== loggedUser.id && !loggedUser.isAdmin) {
//     throw new ForbiddenException(
//       'No tienes permiso para eliminar esta orden',
//     );
//   }

//    4️⃣ Eliminar
//   await this.ordersRepository.deleteOrder(id);

//   return { message: 'Orden eliminada correctamente' };
// }
//**borrar || cancelar */

// async deleteOrder(id:string): Promise<Order> {
//       return this.ordersRepository.deleteOrder(id);
//   }

//**stock vuelva como antes al cancelar unaorden */
//  async deleteOrder(id: string): Promise<{ message: string }> {
//       const order = await this.ordersRepository.getOrder(id);
//       const result = await this.ordersRepository.deleteOrder(order);
//       for (const product of order.orderDetail.products) {
//           console.log(`Service: Actualizando stock del producto ID: ${product.id}, Stock actual: ${product.stock}`);
//           await this.productsRepository.updateProduct(product.id, { stock: product.stock + 1 });
//       }
//       return result;
//   }
