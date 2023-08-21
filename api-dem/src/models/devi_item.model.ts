import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Devis } from './devis.model'; // Import the Devis entity you've defined
import { Meuble } from './meuble.model'; // Import the Meuble entity you've defined

@Entity({ name: 'devi_items' })
export class DeviItem {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => Meuble)
  @JoinColumn({ name: 'meuble_id' })
  meuble_id: Meuble;

  @Column({ type: 'integer', name: 'quantite' })
  quantite: number;



  @ManyToOne(() => Devis)
  @JoinColumn({ name: 'devis_id' })
  devis_id: number;
}
