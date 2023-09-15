// import { Length, IsNumber } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class updateHotelDto {
//   @ApiProperty()
//   @Length(3, 50, {
//     message: 'Title must be between 3 and 50 characters',
//   })
//   hotelName: string;
//   @ApiProperty()
//   hotelAddress: string;
//   @ApiProperty()
//   location: string;

//   @ApiProperty()
//   @IsNumber()
//   rating: number;

//   @ApiProperty()
//   phoneNo: string;

//   @ApiProperty()
//   emailID: string;

//   @ApiProperty()
//   HotelAmenities: [string];

//   @ApiProperty()
//   roomType: [
//     {
//       amenities: [string];
//       price: number;
//       category: string;
//       roomDimesation: string;
//       totalCountOfRoom: number;
//       accomodation: number;
//       image: [Buffer];
//       roomPolicy: [string];
//     },
//   ];

//   @ApiProperty()
//   reviews: [string];

//   @ApiProperty()
//   hotelDescription: [string];
// }

import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateHotelDto {

  @Field(() => String, { nullable: true })
  hotelName: string;

  @Field(() => String, { nullable: true })
  hotelAddress: string;

  @Field(() => String, { nullable: true })
  location: string;

  @Field(() => String, { nullable: true })
  rating: string;

  @Field(() => String, { nullable: true })
  phoneNo: string;

  @Field(() => String, { nullable: true })
  emailID: string;

  @Field(() => [String], { nullable: true })
  reviews: string[];

  @Field(() => [String], { nullable: true })
  hotelDescription: string[];

  @Field(() => String, { nullable: true })
  hotelType: string;

  @Field(() => ID)
  _id?: string;
}