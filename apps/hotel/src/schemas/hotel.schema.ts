import * as mongoose from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Document } from 'mongoose';

export const HotelSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  hotelName: String,
  hotelAddress: String,
  location: String,
  rating: Number,
  phoneNo: String,
  emailID: String,
  HotelAmenities: [String],
  roomType: [
    {
      amenities: [String],
      price: Number,
      category: String,
      roomDimesation: String,
      totalCountOfRoom: Number,
      accomodation: Number,
      image: [Buffer],
      roomPolicy: [String],
    },
  ],
  reviews: [String],
  hotelDescription: [String],
});

@ObjectType()
export class Hotel extends Document {

  @Field(() => ID)
  _id?: string;


  @Field()
  hotelName?: string;

  @Field()
  hotelAddress?: string;

  @Field()
  location: string;

  @Field()
  rating: string;

  @Field()
  phoneNo: string;

  @Field()
  emailID: string;

  @Field(() => String, { nullable: true })
  hotelType?: string;

  @Field(() => [String])
  reviews: string[];

  @Field(() => [String])
  hotelDescription: string[];
}
