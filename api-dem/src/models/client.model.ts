import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { Devis } from './devis.model'; 
@Entity({ name: 'client' })
export class Client {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'nom_prenom',
  })
  nom_prenom: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
    name: 'email',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'tel',
  })
  tel: string;


  @OneToMany(() => Devis, (devis) => devis.client)
  devis: Devis[]; 

}
