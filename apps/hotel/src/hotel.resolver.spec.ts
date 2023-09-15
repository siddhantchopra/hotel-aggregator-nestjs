import { Test, TestingModule } from '@nestjs/testing';
import { HotelResolver } from './hotel.resolver';
import { HotelService } from './hotel.services';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { UpdateHotelDto } from './dtos/update-hotel.dto';
import { Hotel } from './schemas/hotel.schema';

describe('HotelResolver', () => {
  let hotelResolver: HotelResolver;
  let hotelService: HotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelResolver, HotelService],
    }).compile();

    hotelResolver = module.get<HotelResolver>(HotelResolver);
    hotelService = module.get<HotelService>(HotelService);
  });

  describe('getAllHotel', () => {
    it('should return an array of hotels', async () => {
      const hotels: Hotel[] = []; // Create sample hotels here

      jest.spyOn(hotelService, 'getAllHotel').mockResolvedValue(hotels);

      const result = await hotelResolver.getAllHotel();

      expect(result).toEqual(hotels);
    });
  });

  describe('getHotelByName', () => {
    it('should return a hotel by name', async () => {
      const hotelName = 'Example Hotel';
      const hotel: Hotel = {
        _id: '1',
        hotelName: hotelName,
        hotelAddress: '123 Main St',
        location: 'City',
        rating: '4',
        phoneNo: '555-1234',
        emailID: 'example@example.com',
        reviews: [],
        hotelDescription: [],
      };

      jest.spyOn(hotelService, 'getHotelByName').mockResolvedValue(hotel);

      const result = await hotelResolver.getHotelByName(hotelName);

      expect(result).toEqual(hotel);
    });
  });

  describe('addHotel', () => {
    it('should create a new hotel and return true', async () => {
      const createHotelDto: CreateHotelDto = {
        // Fill in the DTO properties here
        hotelName: 'Example Hotel',
        hotelAddress: '123 Main St',
        location: 'City',
        rating: '4',
        phoneNo: '555-1234',
        emailID: 'example@example.com',
        reviews: [],
        hotelDescription: [],
      };

      jest.spyOn(hotelService, 'createHotel').mockResolvedValue(createHotelDto);

      const result = await hotelResolver.addHotel(createHotelDto);

      expect(result).toBe(true);
    });
  });

  describe('updateCustomHotelById', () => {
    it('should update a hotel and return the updated hotel', async () => {
      const updateHotelDto: UpdateHotelDto = {
        // Fill in the DTO properties here
      };

      jest.spyOn(hotelService, 'updateCustomHotelById').mockResolvedValue(updateHotelDto);

      const result = await hotelResolver.updateCustomHotelById(updateHotelDto);

      expect(result).toEqual(updateHotelDto);
    });
  });

  describe('deleteHotelById', () => {
    it('should delete a hotel and return true', async () => {
      const hotelId = '123'; // Provide a sample hotel ID

      jest.spyOn(hotelService, 'deleteHotelById').mockResolvedValue(true);

      const result = await hotelResolver.deleteHotelById(hotelId);

      expect(result).toBe(true);
    });
  });
});
