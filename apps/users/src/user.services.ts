import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserCustomSchema } from '../src/schemas/user.schema';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
type UserCustomSchema = any;
@Injectable()
export class UserService {
  constructor(
    @InjectModel('CustomUsers') private readonly userModel,
    @Inject('BOOKING_SERVICE') private bookingClient: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserCustomSchema> {
    const createUser = await this.userModel(createUserDto);
    return createUser.save();
  }

  async findAll() {
    return this.userModel.find({});
  }

  async findOne(condition: any): Promise<UserCustomSchema> {
    const userDetail = await this.userModel.findOne(condition);
    return userDetail;
  }

  async update(_id: string, updateUserDto: CreateUserDto) {
    return this.userModel.findOneAndUpdate({ _id }, updateUserDto, {
      new: true,
    });
  }

  async remove(_id: string) {
    return this.userModel.deleteOne({ _id });
  }

  async callService(booking) {
    console.log('booking service called from user');
    return this.bookingClient.send({ cmd: 'createBooking' }, booking);
  }

  async callServiceInfo(id) {
    console.log(id, 'ddddd');
    return this.bookingClient.send({ cmd: 'getBookingInfo' }, id);
  }
}
