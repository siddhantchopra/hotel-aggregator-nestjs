import * as mongoose from 'mongoose';

export const BookingSchema = new mongoose.Schema({
  customerName: String,
  checkInDate: String,
  checkOutDate: String,
  roomNumber: Number,
  numberOfGuests: Number,
  userID: String,
  hotelID: String,
});
