import { Column, Entity, PrimaryGeneratedColumn,OneToMany,JoinColumn } from 'typeorm';
import { Meuble } from './meuble.model';
@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'title',
  })
  title: string;


  @OneToMany(() => Meuble, (meuble) => meuble.category) 
  @JoinColumn({ name: 'id' })
  meubles: Meuble[];

  
}



