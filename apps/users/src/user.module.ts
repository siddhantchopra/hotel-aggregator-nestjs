import { Module } from '@nestjs/common';
import { UserService } from './user.services';
import { UserCustomController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCustomSchema } from './schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/users/.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'CustomUsers', schema: UserCustomSchema },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    ClientsModule.register([
      {
        name: 'BOOKING_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'booking',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [UserCustomController, AuthController],
  providers: [UserService],
})
export class UserModule {}
