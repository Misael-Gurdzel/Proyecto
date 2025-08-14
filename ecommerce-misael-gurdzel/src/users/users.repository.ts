// // // import { Injectable } from '@nestjs/common';
// // import { InjectRepository } from '@nestjs/typeorm';
// // import { Repository } from 'typeorm';
// // import { User } from 'src/entities/user.entity';
// // import { Injectable } from '@nestjs/common';

// // @Injectable()
// // export class UsersRepository {
// //   constructor(
// //     @InjectRepository(User)
// //     private readonly usersRepo: Repository<User>,
// //   ) {}

// //   async getUserByEmail(email: string): Promise<User | undefined> {
// //     return this.usersRepo.findOne({ where: { email } });
// //   }

// //   async getUserById(id: string): Promise<User | undefined> {
// //     return this.usersRepo.findOne({ where: { id }, relations: ['orders'] });
// //   }

// //   async addUser(user: Partial<User>): Promise<User> {
// //     const newUser = this.usersRepo.create(user);
// //     return this.usersRepo.save(newUser);
// //   }
// // }
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../entities/user.entity';

// @Injectable()
// export class UsersRepository {
//   constructor(
//     @InjectRepository(User)
//     private readonly usersRepo: Repository<User>,
//   ) {}

//   async getUsers(page: number, limit: number): Promise<User[]> {
//     const skip = (page - 1) * limit;
//     return this.usersRepo.find({ skip, take: limit });
//   }

//   async findByEmail(email: string): Promise<User | undefined> {
//     const user = await this.usersRepo.findOne({ where: { email } });
//     return user ?? undefined;
//   }

//   async findById(id: string): Promise<User | undefined> {
//     const user = await this.usersRepo.findOne({
//       where: { id },
//       relations: ['orders'],
//     });
//     return user ?? undefined;
//   }

//   async createUser(user: Partial<User>): Promise<User> {
//     const newUser = this.usersRepo.create(user);
//     return this.usersRepo.save(newUser);
//   }

//   async updateUser(id: string, user: Partial<User>): Promise<User> {
//     await this.usersRepo.update(id, user);
//     return this.findById(id) as Promise<User>;
//   }

//   async deleteUser(id: string): Promise<void> {
//     await this.usersRepo.delete(id);
//   }
// }

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
