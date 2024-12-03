import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity({name:'credit_cards'})
export class Card {

    @PrimaryGeneratedColumn()
    id : number;

    @Column('varchar',{
        unique : true
    })
    cardNumber : string;

    @Column('float')
    creditLimit : number;

    @Column('float',{
        default : 0.0
    })
    balance : number;

    @ManyToOne(
        () => User,
        (user) => user.card,
        {onDelete: "CASCADE"}
    )
    @JoinColumn({name:"user_id"})
    user : User;

    @OneToMany(
        () => Transaction,
        (transaction) => transaction.card
      )
      transaction : Transaction[]

}
