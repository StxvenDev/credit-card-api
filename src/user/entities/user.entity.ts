import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
