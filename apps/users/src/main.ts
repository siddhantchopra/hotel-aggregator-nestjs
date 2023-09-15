// import { UserModule } from './user.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from './user.module';
import { Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.setGlobalPrefix('/v1/api');
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Hotel Aggregator - User Service')
    .setDescription('List of APIs to create, update and delete any User')
    .setVersion('1.0')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api/users', app, document);
  await app.listen(3001);
}
bootstrap();

// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     UserModule,
//     {
//       transport: Transport.TCP,
//       options: {
//         host: 'localhost',
//         port: 3001,
//       },
//     },
//   );
//   await app
//     .listen()
//     .then(() => console.log('User Microservice is listening at Port 3001'));
// }
// bootstrap();
