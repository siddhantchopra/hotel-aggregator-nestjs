import { NestFactory } from '@nestjs/core';
import { BookingModule } from './booking.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookingModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002,
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
