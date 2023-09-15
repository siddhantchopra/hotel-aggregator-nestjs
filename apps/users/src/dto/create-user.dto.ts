import { Length, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({})
  @Length(3, 50, {
    message: 'Title must be between 3 and 30 characters',
  })
  'name': string;

  @ApiProperty()
  @IsNotEmpty({})
  @IsNumber()
  'phoneNo': number;

  @ApiProperty()
  @IsNotEmpty({})
  'emailID': string;

  @ApiProperty()
  @IsNumber()
  'age': number;

  @ApiProperty()
  @IsNotEmpty({})
  'password': string;
}
