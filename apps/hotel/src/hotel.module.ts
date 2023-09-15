import { Module } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { MulterModule } from '@nestjs/platform-express';
import { HotelSchema } from './schemas/hotel.schema';
import { HotelService } from './hotel.services';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HotelResolver } from './hotel.resolver';
import { HotelController } from './hotel.controller';
// import { PrometheusModule } from '@willsoto/nestjs-prometheus';
// import { LoggingInterceptor } from './logging.interceptor';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/hotel/.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'hotel.gql',
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'Hotel', schema: HotelSchema }]),
    // PrometheusModule.register(),
  ],
  controllers: [HotelController],
  providers: [
    HotelService,
    HotelResolver,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
  ],
})
export class HotelModule {}
