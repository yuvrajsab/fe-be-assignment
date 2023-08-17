import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { IUser } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @Public()
  async register(@Body() registerUserDto: RegisterUserDto) {
    const result = await this.usersService.registerUser(
      registerUserDto.name,
      registerUserDto.email,
      registerUserDto.password,
      registerUserDto.address,
    );

    return {
      id: result.identifiers[0].id,
      name: registerUserDto.name,
      email: registerUserDto.email,
      address: registerUserDto.address,
    };
  }

  @Post('/watch-later/add')
  addWatchLater(
    @Body('videoIds') videoIds: number[],
    @Req() request: Request & { user: IUser },
  ) {
    this.usersService.attachVideos(request['user'].id, videoIds);

    return {
      message: 'done',
    };
  }

  @Post('/watch-later/remove')
  removeWatchLater(
    @Body('videoIds') videoIds: number[],
    @Req() request: Request & { user: IUser },
  ) {
    this.usersService.detachVideos(request['user'].id, videoIds);

    return {
      message: 'done',
    };
  }

  @Get('/watch-later/list')
  viewWatchLater(@Req() request: Request & { user: IUser }) {
    return this.usersService.getVideos(request['user'].id);
  }
}
