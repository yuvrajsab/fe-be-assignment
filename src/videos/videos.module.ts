import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { YoutubeService } from './youtube.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [VideosController],
  providers: [VideosService, YoutubeService],
  exports: [TypeOrmModule, YoutubeService, VideosService],
})
export class VideosModule {}
