import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { HotelService } from './hotel.services';
import { Hotel } from './schemas/hotel.schema';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { UpdateHotelDto } from './dtos/update-hotel.dto';

@Resolver(() => Hotel)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Query(() => [Hotel])
  async getAllHotel(): Promise<Hotel[]> {
    return this.hotelService.getAllHotel();
  }

  @Query(() => Hotel)
  async getHotelByName(@Args('hotelName') hotelName: string) {
    return this.hotelService.getHotelByName(hotelName);
    // try {
    //   const name = await this.hotelService.getHotelByName(hotelName); // case insensitive implementation
    //   if (name) {
    //     return name;
    //   }
    //   return 'not found';
    // } catch (error) {
    //   console.log(error);
    // }
  }

  @Mutation(() => Hotel)
  async addHotel(@Args('input') input: CreateHotelDto) {
    await this.hotelService.createHotel({ ...input });
    return true;
  }

  @Mutation(() => Hotel)
  async updateCustomHotelById(@Args('input') input: UpdateHotelDto) {
    return this.hotelService.updateCustomHotelById(input._id, input);
  }

  @Mutation(() => Boolean)
  async deleteHotelById(@Args('_id', { type: () => ID }) _id: string) {
    return this.hotelService.deleteHotelById(_id);
  }
}
