import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.repo.find();
  }

  async addCategoryIfNotExists(name: string): Promise<Category> {
    let category = await this.repo.findOne({ where: { name } });
    if (!category) {
      category = this.repo.create({ name });
      await this.repo.save(category);
    }
    return category;
  }

  async getCategory(id: string, name: Partial<Category>): Promise<Category> {
    await this.repo.update(id, name);
    return await this.getCategory(id, name);
  }

  async findOneById(id: string): Promise<Category | null> {
    return await this.repo.findOne({ where: { id } });
  }
  //* este es para agregar el estado de activo  a una categoria y asi poder ver cuales lo estan
  // async getIsActive(): Promise<Category[]> {
  //   return await this.repo.find({ where: { isActive: true } });
  // }
  //*Este es para desactivar una categoria
  // async deactivate(id: string): Promise<Category[]> {
  //   const category = await this.findOneById(id);
  //   category.isActive = false;
  //   return await this.repo.save(category);
  // }
}

// async updateName(id: string, name: string): Promise<Category> {
//   const category = await this.findOneById(id);
//   if (!category) {
//     throw new NotFoundException('Categoría no encontrada');
//   }

//   category.name = name;
//   return await this.repo.save(category);
// }
//* este es para tener el total de precios
// async findTotalPrice(id: string): Promise<Category> {
//   const category = await this.repo.findOne({
//     where: { id },
//     relations: ['products'],
//   });
//   if (!category) {
//     throw new NotFoundException('la categoria no se encontró');
//   }

//   if (!category.products || category.products.length === 0) {
//     throw new BadRequestException('Esta categoría no tiene productos');
//   }
//   return category;
// }

//*Este es para obtener una categoria con su nombre y total de productos
// async findOneWithProducts(id: string): Promise<Category> {
//   const category = await this.repo.findOne({
//     where: { id },
//     relations: ['products'],
//   });

//   if (!category) {
//     throw new NotFoundException('la categoria no se encontró');
//   }

//   return category;
// }
//*eliminar por nombre
// async findOne(name: string): Promise<Category> {
//   const category = await this.repo.findOne({
//     where: { name: ILike(`${name}%`) },
//   });

//   if (!category) {
//     throw new NotFoundException(' la catrgotia no se encontro');
//   }
//   return this.repo.remove(category);
// }

// async findOne(id: string): Promise<Category> {
//   const category = await this.repo.findOne({ where: { id } });
//   if (!category) {
//     throw new NotFoundException('la categoria no existe');
//   }
//   return category;
// }

// async findOne(name: string): Promise<Category | null> {
//   return await this.repo.findOne({
//     where: { name: ILike(`${name}%`) },
//     relations: ['products'],
//   });
// }
