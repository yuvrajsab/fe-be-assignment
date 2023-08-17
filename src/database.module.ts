import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          database: configService.get('POSTGRES_DB'),
          entities: [__dirname + '/**/*.entity.{js,ts}'],
          synchronize: configService.get('SYNC_DB') === 'true',
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
