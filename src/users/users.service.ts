import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UtilService } from 'src/helpers/util.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly utilService: UtilService,
  ) {}

  async findUser(email: string): Promise<User | null> {
    return this.userRepo.findOneBy({
      email,
    });
  }

  async registerUser(
    name: string,
    email: string,
    password: string,
    address?: string,
  ) {
    return await this.userRepo.insert({
      email,
      password: this.utilService.createPasswordHash(password),
      name,
      address,
    });
  }

  async attachVideos(userId: number, ids: number[]) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: {
        videos: true,
      },
    });

    const toInsert = ids.filter(
      (videoId) => !user?.videos.map((x) => x.id).includes(videoId),
    );

    await this.userRepo
      .createQueryBuilder()
      .relation(User, 'videos')
      .of(user)
      .addAndRemove(toInsert, []);
  }

  async detachVideos(userId: number, ids: number[]) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: {
        videos: true,
      },
    });

    await this.userRepo
      .createQueryBuilder()
      .relation(User, 'videos')
      .of(user)
      .addAndRemove([], ids);
  }

  async getVideos(userId: number) {
    return await this.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: {
        videos: true,
      },
    });
  }
}
