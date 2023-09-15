import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Get,
  Req
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../user.services';
import { loginDto } from '../dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.gaurd';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(
    @Body() loginDto: loginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const emailID = loginDto.emailID;
    const user = await this.userService.findOne({
      emailID,
    });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('invalid credentials pwd');
    }
    const payload = { email: user.emailID, name: user.name, userId: user._id };
    const jwt = await this.jwtService.signAsync(payload);

    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'successfully logged-in',
      jwt
    };
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  @ApiBearerAuth('JWT-auth')
  async user(@Req() request: Request) {
    return request.user;
    // try {
    //   const cookie = request.cookies['jwt'];
    //   const data = await this.jwtService.verifyAsync(cookie);
    //   const user = await this.userService.findOne({ _id: data['id'] });
    //   user.password = undefined;
    //   return user;
    // } catch (err) {
    //   throw new UnauthorizedException();
    // }
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'successfully logged-out',
    };
  }
}
