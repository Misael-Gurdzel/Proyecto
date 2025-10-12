import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(
    @Param('id')
    productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000, //* 200kb
            message: 'La imagen supera el maximo permitidos de 200kb',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.png|.webp|.jpeg)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('👉 ProductId recibido:', productId);
    console.log('📂 Archivo recibido:', file);
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }
    return this.fileUploadService.uploadImage(file, productId);
  }
}
