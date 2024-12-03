import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post(':id/cards')
  create(
    @Body() createCardDto: CreateCardDto,
    @Param('id') id : number
  ) {
    return this.cardService.create(createCardDto, id);
  }

  @Get('all')
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @Get(':id/user')
  getCards(@Param('id') id: string) {
    return this.cardService.getCards(+id);
  }

  @Get(':id/saldo')
  getBalance(@Param('id') id: string) {
    return this.cardService.getBalance(+id);
  }

  @Post(':id/pay')
  payCard(
    @Body() payload : any,
    @Param('id') id: string
  ) {
    const {amount} = payload;
    return this.cardService.payCard(+id, amount);
  }

  @Post(':id/pucharse')
  buyCard(
    @Body() payload : any,
    @Param('id') id: string
  ) {
    const {amount} = payload;
    return this.cardService.buyCard(+id, amount);
  }

}
