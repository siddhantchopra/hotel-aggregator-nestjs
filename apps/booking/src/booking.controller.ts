// booking.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/create-booking.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @MessagePattern({ cmd: 'createBooking' })
  async create(@Body() bookingDto: BookingDto) {
    // Create a booking
    try {
      console.log('reached to booking microsrvice')
      return this.bookingService.createBooking(bookingDto);
    } catch (error) {
      throw new BadRequestException(error); // This will return a 400 Bad Request with validation error details
    }
  }

  @MessagePattern({ cmd: 'getBookingInfo' })
  async findOne(id: string) {
    // Retrieve a booking by ID
    return this.bookingService.findOne(id);
  }

  // @Put(':id')
  // async update(id: string, bookingDto: BookingDto) {
  //   // Update a booking by ID
  //   return this.bookingService.update(id, bookingDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   // Delete a booking by ID
  //   return this.bookingService.remove(id);
  // }
}
