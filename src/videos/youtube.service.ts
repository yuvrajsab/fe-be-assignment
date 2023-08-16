import * as google from '@googleapis/youtube';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YoutubeService {
  private youtubeInstance;

  constructor(private readonly configService: ConfigService) {
    this.youtubeInstance = google.youtube({
      version: 'v3',
      auth: this.configService.get('YOUTUBE_API_KEY'),
    });
  }

  getInstance() {
    return this.youtubeInstance;
  }

  async getLatestVideos() {
    return await this.youtubeInstance.videos.list({
      part: ['snippet'],
      chart: 'mostPopular',
      maxResults: 50,
    });
  }
}
