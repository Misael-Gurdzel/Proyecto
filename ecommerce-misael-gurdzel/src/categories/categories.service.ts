import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import data from '../utils/data.json';

interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
  addcategory() {
    return this.categoriesRepository.getCategories();
  }

  async addCategories() {
    console.log('DATA JSON:', data);
    const products = data as ProductData[];
    if (!Array.isArray(products)) {
      throw new Error('Invalid data format');
    }
    const uniqueCategories = new Set<string>();

    for (const product of products) {
      uniqueCategories.add(product.category);
    }

    for (const categoryName of uniqueCategories) {
      await this.categoriesRepository.addCategoryIfNotExists(categoryName);
    }

    return { message: 'Categorías precargadas correctamente' };
  }
  //* este es para agregar el estado de activo  a una categoria y asi poder ver cuales lo estan
  // async getIsActive() {
  //   return await this.categoriesRepository.getIsActive();
  // }
  //*Este es para desactivar una categoria
  // async desactivarCategoria(id: string): Promise<Category | null> {
  //   const category = await this.categoriesRepository.findOneById(id);

  //   if (!category) {
  //     throw new NotFoundException(`La categoría con id ${id} no existe`);
  //   }

  //   if (!category.isActive) {
  //     return category;
  //   }
  //   const updatedCategory = await this.categoriesRepository.deactivate(id);

  //   return updatedCategory;
  // }
}

// async updateCategoryName(id: string, name: string) {
//   const category = await this.categoriesRepository.findOneById(id);

//   if (!category) {
//     throw new NotFoundException(`No se encontró la categoría con id ${id}`);
//   }

//   const updatedCategory = await this.categoriesRepository.updateName(
//     id,
//     name,
//   );

//   return {
//     message: 'Nombre actualizado correctamente',
//     updatedCategory,
//   };
// }
//* este es para tener el total de precios
// async getProductPrecio(
//   id: string,
// ): Promise<{ categoryName: string; totalPrice: number }> {
//   if (!id || id.trim().length === 0) {
//     throw new BadRequestException('la categoria con ese id no existe');
//   }
//   const category = await this.categoriesRepository.findTotalPrice(id);

//   const totalPrice = category.products.reduce(
//     (sum, product) => sum + Number(product.price),
//     0,
//   );
//   return {
//     categoryName: category.name,
//     totalPrice,
//   };
// }

//*Este es para obtener una categoria con su nombre y total de productos
// async countProducts(
//   id: string,
// ): Promise<{ categoryName: string; totalProducts: number }> {
//   if (!id) {
//     throw new BadRequestException('Debe proporcionar el ID de una categoría');
//   }
//   const result = await this.categoriesRepository.findOneWithProducts(id);

//   return {
//     categoryName: result.name,
//     totalProducts: result.products.length,
//   };

//*eliminar por nombre
// async deleteCategory(name: string): Promise<Category> {
//   return await this.categoriesRepository.findOne(name);
// }

// async getCategory(id: string): Promise<Category> {
//   return await this.categoriesRepository.findOne(id);
// }

// async getProductsByName(name: string): Promise<Category> {
//   const category = await this.categoriesRepository.findOne(name);

//   if (!name || name.trim().length === 0) {
//     throw new BadRequestException(
//       'se debe colocar el nombre de una categoria',
//     );
//   }
//   if (!category) {
//     throw new NotFoundException('no se encontro la categoria');
//   }
//   return category;
// }

// async getCategoryByName(name: string): Promise<Category> {
//   if (!name || name.trim().length === 0) {
//     throw new BadRequestException(
//       'se debe colocar el nombre de una categoria',
//     );
//   }

//   const category = await this.categoriesRepository.findOne(name);

//   if (!category) {
//     throw new NotFoundException('no se encontro la categoria');
//   }

//   if (category.products.length === 0) {
//     throw new NotFoundException('esta categoria no tiene productos');
//   }
//   return category;
// }
