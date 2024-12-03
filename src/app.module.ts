import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type              : 'mysql',
      host              : 'localhost',
      database          : process.env.DATABASE,
      username          : process.env.DATABASE_USER,
      password          : process.env.DATABASE_PASSWORD,
      port              : 3307,
      autoLoadEntities  : true,
      synchronize       : true
    }),
    UserModule,
    CardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}