// booking.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from './schemas/booking.schema';

@Module({
  imports: [
    ConfigModule.forRoot(), // Import and provide ConfigModule here
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: 'mongodb+srv://siddhantchopra:siddhant17@cluster0.pyvptja.mongodb.net/',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
