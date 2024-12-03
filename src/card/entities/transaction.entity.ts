import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card.entity";

@Entity({name:'transactions'})
export class Transaction {

    @PrimaryGeneratedColumn()
    id : number;

    @Column('float')
    amount : number;

    @Column('varchar')
    transactionType : string;

    @ManyToOne(
        () => Card,
        (card) => card.transaction,
        {onDelete: "CASCADE"}
    )
    @JoinColumn({name:"card_id"})
    card : Card;

    @Column('datetime',{
        default : () => 'CURRENT_TIMESTAMP'
    })
    dateTransaction : Date;

}
