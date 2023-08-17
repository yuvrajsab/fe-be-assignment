import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('/')
  fetchVideos(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    return this.videosService.fetchVideos(limit, offset);
  }

  @Post('/search')
  search(@Body('title') title: string) {
    if (!title) {
      throw new BadRequestException('title is required');
    }

    return this.videosService.searchByTitle(title);
  }

  @Get('/:id')
  async fetchVideo(@Param('id', ParseIntPipe) id: number) {
    const video = await this.videosService.fetchVideo(id);
    if (!video) {
      throw new BadRequestException(`Video with id ${id} not found`);
    }

    return video;
  }
}
