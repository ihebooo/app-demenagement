import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './categorie.model'; // Import the Category entity you've defined

@Entity({ name: 'meubles' })
export class Meuble {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => Category, { cascade: true }) // Assuming you have a Category entity
  @JoinColumn({ name: 'cat_id' })
  category: Category;

  @Column({
    type: 'integer',
    nullable: false,
    name: 'cat_id',
  })
  cat_id: number;

  

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'title',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'img',
  })
  img: string;
}
