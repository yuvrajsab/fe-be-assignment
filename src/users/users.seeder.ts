import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilService } from 'src/helpers/util.service';

@Injectable()
export class UsersSeeder {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly utilService: UtilService,
  ) {
    this.seed();
  }

  async seed() {
    this.userRepo
      .createQueryBuilder()
      .insert()
      .values([
        {
          email: 'yuvraj@example.com',
          name: 'yuvraj',
          address: 'delhi',
          password: this.utilService.createPasswordHash('password'),
        },
      ])
      .orIgnore();
  }

  async drop() {
    return await this.userRepo.delete({});
  }
}
