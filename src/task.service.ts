import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { YoutubeService } from './videos/youtube.service';
import { VideosService } from './videos/videos.service';

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name);
  private static lastEtag: string | null | undefined = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly youtubeService: YoutubeService,
    private readonly videoService: VideosService,
  ) {}

  onModuleInit() {
    const youtubeVideoJob = new CronJob(
      this.configService.get('YOUTUBE_CRON_EX'),
      this.youtubeVideoJobHandler.bind(this),
    );

    this.schedulerRegistry.addCronJob('youtube-cron-job', youtubeVideoJob);
    youtubeVideoJob.start();
  }

  async youtubeVideoJobHandler() {
    this.logger.debug('youtube cron job running');
    const videos = await this.youtubeService.getLatestVideos();

    if (TasksService.lastEtag == videos.data.etag) {
      // same data - nothing is changed
      this.logger.debug('skipping job - data was not change');
      return;
    }

    const items = videos.data.items;
    if (!items) {
      return;
    }

    for (const item of items) {
      await this.videoService.storeVideo(
        item.id!,
        item.snippet!.title!,
        item.snippet!.description!,
        item.snippet!.publishedAt!,
        item.snippet!.thumbnails!.default!.url!,
        `https://www.youtube.com/watch?v=${item.id}`,
      );
    }

    TasksService.lastEtag = videos.data.etag;

    this.logger.debug('youtube cron job complete');
  }
}
