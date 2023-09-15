import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.services';
import { CreateUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
@ApiTags('Users')
@Controller('users')
export class UserCustomController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPwd = await bcrypt.hash(createUserDto.password, 12);
    const finalUserObj = {
      ...createUserDto,
      password: hashedPwd,
    };
    const user = await this.userService.create(finalUserObj);
    user.password = undefined;
    return user;
  }

  @Post('/bookingHotel')
  async createBookingService(@Body() booking: object) {
    return this.userService.callService(booking);
  }

  @Get('/bookingInfo/:bookingId')
  async bookingByID(@Param('bookingId') _id: string) {
    console.log(_id);
    return this.userService.callServiceInfo(_id);
  }

  // @Get('/bookingInfo/:bookingId')
  // async getHotelById(@Param('bookingId') _id: string) {
  //   try {
  //     const hotel = this.userService.callServiceInfo(_id);
  //     if (hotel) {
  //       return hotel;
  //     }
  //     throw new NotFoundException();
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.FORBIDDEN,
  //         error: `The hotel id - ${_id} is not found. Please enter correct one`,
  //       },
  //       HttpStatus.FORBIDDEN,
  //       {
  //         cause: error,
  //       },
  //     );
  //   }
  // }

  @Patch(':id')
  update(@Param('id') _id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') _id: string) {
    return this.userService.remove(_id);
  }
}
