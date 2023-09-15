import { NestFactory } from '@nestjs/core';
import { HotelModule } from './hotel.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(HotelModule);
  app.setGlobalPrefix('/v1/api');
  const config = new DocumentBuilder()
    .setTitle('Hotel Aggregator - Hotel Service')
    .setDescription(
      'List of APIs to create, retrieve, update and delete any hotel',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api/hotel', app, document);
  await app.listen(3003);
}
bootstrap();
