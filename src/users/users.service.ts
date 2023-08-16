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
}
