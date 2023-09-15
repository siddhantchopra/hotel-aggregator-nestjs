// import { Length, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
// import { ApiProperty } from '@nestjs/swagger';

// export class CreateHotelDto {
//   @ApiProperty()
//   @IsNotEmpty({})
//   @Length(3, 50, {
//       message: 'Title must be between 3 and 50 characters'
//   })
//   hotelName: string;

//   @ApiProperty()
//   @IsNotEmpty({})
//   hotelAddress: string;

//   @ApiProperty()
//   @IsNotEmpty({})
//   location: string;

//   @ApiProperty()
//   @IsNumber()
//   rating: number;

//   @ApiProperty()
//   @IsNotEmpty({})
//   phoneNo: string;

//   @ApiProperty()
//   @IsNotEmpty({})
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
//     }
//   ];

//   @ApiProperty()
//   reviews: [string];
  
//   @ApiProperty()
//   hotelDescription: [string];
// }

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHotelDto {
  @Field(() => String)
  hotelName: string;

  @Field(() => String)
  hotelAddress: string;

  @Field(() => String)
  location: string;

  @Field(() => String, { nullable: true })
  rating?: string;

  @Field(() => String)
  phoneNo: string;

  @Field(() => String)
  emailID: string;

  @Field(() => String, { nullable: true })
  reviews: string[];

  @Field(() => String, { nullable: true })
  hotelDescription: string[];

  @Field(() => String, { nullable: true })
  hotelType: string;
}