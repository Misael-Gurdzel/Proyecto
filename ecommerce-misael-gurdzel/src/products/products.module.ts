// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Product } from 'src/entities/products.entity';
// import { ProductsRepository } from './products.repository';
// import { ProductsService } from './products.service';
// import { ProductsController } from './products.controller';

// @Module({
//   imports: [TypeOrmModule.forFeature([Product])],
//   providers: [ProductsService, ProductsRepository],
//   controllers: [ProductsController],
// })
// export class ProductsModule {}
// src/products/products.module.ts (agregar Category + controller seeder)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Category } from 'src/entities/categories.entity';
import { ProductsSeederController } from './products.seeder.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController, ProductsSeederController],
})
export class ProductsModule {}
