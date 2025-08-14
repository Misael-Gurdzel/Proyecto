import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    //* Buscar el producto a actualizar (Validacion)
    const product = await this.productRepository.findOneBy({
      id: productId,
    });
    if (!product) {
      throw new NotFoundException('Producto no encontrado...');
    }
    //*Carga en cloudinary y obtener la url de la imagen de cloudinary:
    const response = await this.fileUploadRepository.uploadImage(file);
    if (!response.secure_url) {
      throw new NotFoundException('Error al cargar la imagen en Cloudinary...');
    }

    //* Modificar el proucto
    await this.productRepository.update(productId, {
      imgUrl: response.secure_url,
    });

    const updatedProduct = await this.productRepository.findOneBy({
      id: productId,
    });

    return updatedProduct;
  }
}
