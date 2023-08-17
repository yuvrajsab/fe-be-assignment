import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersSeeder } from './users.seeder';
import { UtilService } from 'src/helpers/util.service';
import { UsersController } from './users.controller';
import { VideosModule } from 'src/videos/videos.module';

@Module({
  imports: [VideosModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService, UtilService, UsersSeeder],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
