import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { UpdateHotelDto } from './dtos/update-hotel.dto';

@Injectable()
export class HotelService {
  constructor(@InjectModel('Hotel') private readonly hotelModel) {}

  async getHotelById(_id: string) {
    const hotelDetail = await this.hotelModel.findOne({ _id });
    return hotelDetail;
  }

  async createHotel(dto: CreateHotelDto) {
    const createdHotel = new this.hotelModel(dto);
    return createdHotel.save();
  }

  async getAllHotel() {
    return this.hotelModel.find({});
  }

  async updateCustomHotelById(_id: string, hotelCustomData: UpdateHotelDto) {
    return this.hotelModel.findOneAndUpdate({ _id }, hotelCustomData, {
      new: true,
    });
  }

  async deleteHotelById(_id: string) {
    return this.hotelModel.deleteOne({ _id });
  }

  async getHotelByName(hotelName: string) {
    const names = await this.hotelModel.findOne({
      hotelName: new RegExp('(' + hotelName + ')', 'gi'),
    });
    return names;
  }
}
