import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './video.entity';
import { Repository } from 'typeorm';
import { IVideo } from './video.interface';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private readonly videoRepo: Repository<Video>,
  ) {}

  async storeVideos(videos: IVideo[]) {
    return await this.videoRepo
      .createQueryBuilder()
      .insert()
      .values(videos)
      .orIgnore()
      .execute();
  }
}
