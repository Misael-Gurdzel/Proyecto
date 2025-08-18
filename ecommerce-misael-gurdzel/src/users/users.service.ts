// //
// import { Injectable } from '@nestjs/common';
// import { UsersRepository } from './users.repository';
// import { User } from 'src/entities/user.entity';

// @Injectable()
// export class UsersService {
//   constructor(private readonly usersRepository: UsersRepository) {}

//   getUsers(page: number, limit: number): Promise<User[]> {
//     return this.usersRepository.getUsers(page, limit);
//   }

//   updateUser(id: string, user: Partial<User>): Promise<User> {
//     return this.usersRepository.updateUser(id, user);
//   }

//   deleteUser(id: string): Promise<void> {
//     return this.usersRepository.deleteUser(id);
//   }

//   getUserByEmail(email: string): Promise<User | null> {
//     return this.usersRepository.getUserByEmail(email);
//   }

//   addUser(user: Partial<User>): Promise<User> {
//     return this.usersRepository.addUser(user);
//   }
// }
// src/users/users.service.ts (ampliar)
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
    return users.map(({ password: _, ...rest }) => rest);
  }

  async getUserByIdWithOrders(id: string) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    const { password: _, isAdmin, ...safe } = user;
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
    const { password: _, ...safe } = updated;
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
