import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  Min,
  IsPositive,
  Length,
} from 'class-validator';

export class BookingDto {
  @Length(3, 50, {
    message: 'Title must be between 3 and 30 characters',
  })
  customerName: string;

  // @IsDateString({}, { message: 'Invalid date format for check-in date' })
  checkInDate: string;

  // @IsDateString({}, { message: 'Invalid date format for check-out date' })
  checkOutDate: string;

  @IsNumber({}, { message: 'Invalid number format for room number' })
  roomNumber: number;

  @IsNumber({}, { message: 'Invalid number format for number of guests' })
  numberOfGuests: number;

  @IsNotEmpty({})
  userID: string;

  @IsNotEmpty({})
  hotelID: string;
}
