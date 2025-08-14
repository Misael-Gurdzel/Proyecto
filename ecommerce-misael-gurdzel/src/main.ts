import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import ENV from './config/enviroment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Proyecto Integrador M4-Back')
    .setDescription('Aplicacion desarrollada con NestJS')
    .setVersion('1.0.0')
    .addBearerAuth() //*habilitar el uso/autenticacion de TOKENS
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server listening on http://localhost:${ENV.PORT}`);

  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
