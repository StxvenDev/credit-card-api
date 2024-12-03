import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { DataSource, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class CardService {

  constructor(
    @InjectRepository(Card)
    private readonly cardRepository : Repository<Card>,
    @InjectRepository(Transaction)
    private readonly transactionRepository : Repository<Transaction>,
    private readonly userService : UserService,
    private readonly dataSource : DataSource
  ){}

  async create(createCardDto: CreateCardDto, id : number) {
    const user = await this.userService.findOne(id);
    const card : Card = this.cardRepository.create(
      {
        ...createCardDto, 
        user : user
      }
    )
    return await this.cardRepository.save(card);
  }

  async findAll() {
    const cards = await this.cardRepository.find();
    if(!cards)
      throw new NotFoundException('No hay tarjetas de credito registradas');
    return cards;
  }

  async getCards(id : number){
    const queryBuilder = this.cardRepository.createQueryBuilder('card');
    const userCards = await queryBuilder.where('card.user =:userId',{
      userId : id
    }).leftJoinAndSelect('card.user', 'user')
    .getMany()
    if(userCards && userCards.length < 1)
      throw new NotFoundException(`El usuario con el id ${id} no tiene tarjetas de credito asociadas`)
    return userCards;
  }

  async getBalance(id : number){
    const card : Card = await this.findOne(id)
    return {
      balance : card.balance
    }
  }

  async payCard(id : number, amount : number){
    const queryRunner = this.dataSource.createQueryRunner();
    const card = await this.cardRepository.findOneBy({id});
    if(amount < 0 || amount >= card.balance )
      throw new BadRequestException('El monto a pagar no debe ser mayor al del saldo ni menor a 0')
    card.balance -= amount;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.manager.save(card);
      const transaction = this.transactionRepository.create({
        amount : amount,
        transactionType : 'payment',
        card
      });
      await queryRunner.manager.save(transaction);
      await queryRunner.commitTransaction();
      return {
        card,
        transaction
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }finally{
      await queryRunner.release();
    }
  }

  async buyCard(id : number, amount : number){
    const queryRunner = this.dataSource.createQueryRunner();
    const card = await this.cardRepository.findOneBy({id});
    if( amount <= 0 )
      throw new BadRequestException('El valor de la compra debe ser mayor a cero')
    card.balance += amount;
    if(card.balance > card.creditLimit)
      throw new BadRequestException('Esta compra excede el limite de credito')
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.manager.save(card);
      const transaction = this.transactionRepository.create({
        amount : amount,
        transactionType : 'pucharse',
        card
      });
      await queryRunner.manager.save(transaction);
      await queryRunner.commitTransaction();
      return {
        card,
        transaction
      }
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    }finally{
      await queryRunner.release();
    }
  }

  async findOne(id: number) {
    const card : Card = await this.cardRepository.findOneBy({id});
    if(!card)
      throw new NotFoundException(`Tarjeta de credito con el id ${id} no existe`)
    return card;
  }

}
