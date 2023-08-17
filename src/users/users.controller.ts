import {
  BadRequestException,
  Body,
  Controller,
  Get,
  ParseArrayPipe,
  Post,
  Req,
} from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { IUser } from './user.interface';
import { VideosService } from 'src/videos/videos.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly videosService: VideosService,
  ) {}

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
  async addWatchLater(
    @Body('videoIds', new ParseArrayPipe({ items: Number }))
    videoIds: number[],
    @Req() request: Request & { user: IUser },
  ) {
    await this.validateWatchLaterApi(videoIds);

    this.usersService.attachVideos(request['user'].id, videoIds);

    return {
      message: 'done',
    };
  }

  @Post('/watch-later/remove')
  async removeWatchLater(
    @Body('videoIds', new ParseArrayPipe({ items: Number })) videoIds: number[],
    @Req() request: Request & { user: IUser },
  ) {
    await this.validateWatchLaterApi(videoIds);

    this.usersService.detachVideos(request['user'].id, videoIds);

    return {
      message: 'done',
    };
  }

  @Get('/watch-later/list')
  viewWatchLater(@Req() request: Request & { user: IUser }) {
    return this.usersService.getVideos(request['user'].id);
  }

  async validateWatchLaterApi(videoIds: number[]) {
    const ids = await this.videosService.validateIdExists(videoIds);
    const invalidIds = videoIds.filter((x) => !ids.includes(x));
    if (invalidIds.length > 0) {
      throw new BadRequestException(`Ids ${invalidIds} are invalid`);
    }
  }
}
