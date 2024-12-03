import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type              : 'mysql',
      host              : 'localhost',
      database          : process.env.DB_DATABASE,
      username          : process.env.DB_USER,
      password          : process.env.DB_PASSWORD,
      port              : 3307,
      autoLoadEntities  : true,
      synchronize       : true
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}