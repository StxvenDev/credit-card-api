import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { User } from 'src/user/entities/user.entity';
import { Transaction } from './entities/transaction.entity';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Card, User, Transaction])
  ]
})
export class CardModule {}
