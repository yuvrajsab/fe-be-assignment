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

  async fetchVideos(limit: number = 10000, offset: number = 0) {
    return await this.videoRepo
      .createQueryBuilder()
      .limit(limit)
      .offset(offset)
      .select()
      .execute();
  }

  async fetchVideo(id: number) {
    return await this.videoRepo.findOneBy({
      id,
    });
  }

  async searchByTitle(title: string) {
    return await this.videoRepo
      .createQueryBuilder()
      .where('lower(title) like lower(:name)', { name: `%${title}%` })
      .getMany();
  }

  async validateIdExists(ids: number[]) {
    const res: { id: number }[] = await this.videoRepo
      .createQueryBuilder()
      .whereInIds(ids)
      .select('id')
      .execute();

    return res.map((x) => x.id);
  }
}
