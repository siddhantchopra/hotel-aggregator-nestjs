import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { HotelService } from './hotel.services';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateHotelDto } from './dtos/update-hotel.dto';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @ApiTags('create Hotel')
  @Post('')
  async createHotel(@Body() body: CreateHotelDto) {
    return this.hotelService.createHotel(body);
  }

  @ApiTags('get Hotel List')
  @Get()
  async getAllHotel() {
    return this.hotelService.getAllHotel();
  }

  @ApiTags('update Hotel')
  @Patch(':hotelId')
  async updateCustomHotelById(
    @Param('hotelId') _id: string,
    @Body() updateHotelDto: UpdateHotelDto,
  ) {
    return this.hotelService.updateCustomHotelById(_id, updateHotelDto);
  }

  @ApiTags('delete Hotel')
  @Delete(':hotelId')
  async deleteHotelById(@Param('hotelId') _id: string) {
    return this.hotelService.deleteHotelById(_id);
  }

  @Get('/search/:hotelName')
  async getHotelByName(@Param('hotelName') hotelName: string) {
    try {
      const name = await this.hotelService.getHotelByName(hotelName); // case insensitive implementation
      if (name) {
        return name;
      }
      throw new NotFoundException();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `The hotel Name - ${hotelName} is not found. Please enter correct one`,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @ApiTags('get Hotel by ID')
  @Get(':hotelId')
  async getHotelById(@Param('hotelId') _id: string) {
    try {
      const hotel = await this.hotelService.getHotelById(_id);
      if (hotel) {
        return hotel;
      }
      throw new NotFoundException();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `The hotel id - ${_id} is not found. Please enter correct one`,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/img/:imgPath')
  getUploadedFile(@Param('imgPath') img, @Res() res) {
    res.sendFile(img, { root: 'uploads' });
  }

  @ApiTags('add Image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        hotelImage: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/addImage')
  @UseInterceptors(
    FilesInterceptor('hotelImage', 1, {
      storage: diskStorage({
        destination: './uploads/',
        filename: function (req, file, cb) {
          console.log(file);
          cb(null, file.originalname);
        },
      }),
    }),
  )
  addImage(@UploadedFiles() hotelImage: Array<Express.Multer.File>): object {
    console.log(hotelImage);
    const a = hotelImage.map((d) => d.filename).toString();
    return {
      message: a + ' uploaded successfully',
    };
  }

  @Get('/cities')
  async getAllCities() {
    const hotels = this.hotelService.getAllHotel();
    const cities = Promise.resolve(hotels).then((res) => {
      return res.map((re) => re.location || '');
    });
    return cities;
  }
}

/* upload image code */
// @Post('/addImage')
// @UseInterceptors(FileInterceptor('hotelImage'))
// addImage(@UploadedFile() hotelImage: Express.Multer.File): object {
//   console.log(hotelImage);
//   return {
//     message: 'file uploaded',
//   };
// }

// @Post('/addImage')
// @UseInterceptors(
//   FileFieldsInterceptor([
//     {
//       name: 'hotelImage',
//       maxCount: 2,
//     },
//   ]),
// )
// addImage(
//   @UploadedFiles() hotelImage: { hotelImage?: Express.Multer.File[] },
// ): object {
//   console.log(hotelImage);
//   return {
//     message: 'file uploaded',
//   };
// }
