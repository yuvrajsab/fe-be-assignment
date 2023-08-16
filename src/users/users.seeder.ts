import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilService } from 'src/helpers/util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersSeeder {
  private readonly logger = new Logger(UsersSeeder.name);

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly utilService: UtilService,
    private readonly configService: ConfigService,
  ) {
    if (configService.get('RUN_SEED') === 'true') {
      this.seed();
    }
  }

  async seed() {
    this.logger.debug('Seeding dummy user');
    await this.userRepo
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
      .orIgnore()
      .execute();
  }

  async drop() {
    return await this.userRepo.delete({});
  }
}
