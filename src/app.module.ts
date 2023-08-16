import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UtilService } from './helpers/util.service';
import { DatabaseModule } from './database.module';
import { VideosModule } from './videos/videos.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    VideosModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, UtilService, TasksService],
})
export class AppModule {}
