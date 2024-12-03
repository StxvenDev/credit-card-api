import { Card } from "src/card/entities/card.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn()
  id : number;

  @Column('varchar')
  fullname : string;

  @Column('varchar',{
    unique : true
  })
  email : string;

  @OneToMany(
    () => Card,
    (card) => card.user
  )
  card : Card[]
}
