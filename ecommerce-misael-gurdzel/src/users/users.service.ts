//
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number): Promise<User[]> {
    return this.usersRepository.getUsers(page, limit);
  }

  updateUser(id: string, user: Partial<User>): Promise<User> {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string): Promise<void> {
    return this.usersRepository.deleteUser(id);
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getUserByEmail(email);
  }

  addUser(user: Partial<User>): Promise<User> {
    return this.usersRepository.addUser(user);
  }
}
