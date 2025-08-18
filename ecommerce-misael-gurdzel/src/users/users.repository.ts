import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async addUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  async getUsers(page: number, limit: number): Promise<User[]> {
    const skip = (page - 1) * limit;
    return this.userRepo.find({
      skip,
      take: limit,
      relations: ['orders'],
    });
  }

  getUserById(id: string): Promise<User | null> {
    // Solo id y date de las órdenes
    return this.userRepo.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'email',
        'address',
        'phone',
        'country',
        'city',
        'isAdmin',
      ],
      relations: { orders: true },
    });
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    Object.assign(user, userData);
    return this.userRepo.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`User with id ${id} not found`);
  }
}
