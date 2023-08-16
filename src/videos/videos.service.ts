import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private readonly videoRepo: Repository<Video>,
  ) {}

  async storeVideo(
    youtubeId: string,
    title: string,
    description: string,
    publishedAt: string,
    thumbnailUrl: string,
    videoUrl: string,
  ) {
    return await this.videoRepo
      .createQueryBuilder()
      .insert()
      .values({
        youtubeId,
        title,
        description,
        publishedAt,
        thumbnailUrl,
        videoUrl,
      })
      .orIgnore()
      .execute();
  }
}
