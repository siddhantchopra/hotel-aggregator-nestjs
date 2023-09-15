// booking.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingDto } from './dto/create-booking.dto';
import { BookingSchema } from './schemas/booking.schema';

@Injectable()
export class BookingService {
  constructor(@InjectModel('Booking') private readonly bookingModel) {}

  async createBooking(bookingDto: BookingDto): Promise<typeof BookingSchema> {
    // Create a new booking
    const newBooking = new this.bookingModel({
      ...bookingDto,
    });

    // Save the booking to MongoDB
    const createdBooking = await newBooking.save();

    return createdBooking;

    // // Send a booking request to the Hotel app over TCP
    // const hotelResponse = await this.hotelClient
    //   .send('createBooking', createdBooking) // 'createBooking' should match the Hotel app's method name
    //   .toPromise();

    // if (hotelResponse.success) {
    //   return createdBooking;
    // } else {
    //   // If the Hotel app fails to process the booking, you can handle the error here
    //   throw new Error('Booking request to Hotel app failed');
    // }
  }

  async findOne(id: string): Promise<typeof BookingSchema> {
    // Retrieve a booking by ID from MongoDB
    return this.bookingModel.findById(id).exec();
  }

  async update(
    id: string,
    bookingDto: BookingDto,
  ): Promise<typeof BookingSchema> {
    // Update a booking by ID in MongoDB
    return this.bookingModel
      .findByIdAndUpdate(id, bookingDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<typeof BookingSchema> {
    // Delete a booking by ID from MongoDB
    return this.bookingModel.findByIdAndRemove(id).exec();
  }

  // Implement booking-related logic here
}
