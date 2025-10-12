import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.getUsers(page, limit);
    return users.map(({ password, ...rest }) => rest);
  }

  async getUserByIdWithOrders(id: string) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    const { password, isAdmin, ...safe } = user;
    return { ...safe }; // en esta vista NO exponer isAdmin
  }

  updateUser(id: string, user: Partial<User>): Promise<User> {
    return this.usersRepository.updateUser(id, user);
  }

  async updateUserSafe(
    id: string,
    user: Partial<User>,
  ): Promise<Omit<User, 'password'>> {
    const updated = await this.updateUser(id, user);
    const { password, ...safe } = updated;
    return safe;
  }

  deleteUser(id: string): Promise<void> {
    return this.usersRepository.deleteUser(id);
  }

  async deleteUserAndReturnId(id: string): Promise<{ id: string }> {
    await this.deleteUser(id);
    return { id };
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getUserByEmail(email);
  }

  addUser(user: Partial<User>): Promise<User> {
    return this.usersRepository.addUser(user);
  }
}

// //*Buscar un usuario por id
// async findById(id: string): Promise<User | null> {
//   return await this.usersRepository.findOne({ where: { id } });
// }

// //* Guardadr un usuario (crear o actualizar)
// async save(user: User): Promise<User> {
//   return await this.usersRepository.save(user);
// }

// //*Hacer admin a un usuario
// async makeAdmin(id: string): Promise<User> {
//   const user = await this.findById(id);
//   if (!user) {
//     throw new NotFoundException(`User with id ${id} not found`);
//   }
//   user.isAdmin = true;
//   return await this.save(user);
// }
