import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Client } from './client.model'; // Import the Client entity you've defined
import { Adresse } from './adresse.model'; // Import the Adresse entity you've defined
import { DeviItem } from './devi_item.model';

@Entity({ name: 'devis' })
export class Devis {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client_id: number;

  @ManyToOne(() => Adresse)
  @JoinColumn({ name: 'adr_arr_id' })
  adr_arr_id: number;

  @ManyToOne(() => Adresse)
  @JoinColumn({ name: 'adr_dep_id' })
  adr_dep_id: number;

  @Column({ type: 'timestamp', name: 'date_dem' })
  date_dem: Date;

  @Column({ type: 'varchar', length: 255, name: 'message', nullable: true })
  message: string;

  @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'varchar', length: 255, default: 'open', name: 'status' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'prix' })
  prix: number;


  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' }) // Column name in the database table
  client: Client; // This is the property that will hold the Client instance

  @ManyToOne(() => Adresse)
  @JoinColumn({ name: 'adr_arr_id' }) // Column name in the database table
  adr_arr: Adresse; // This is the property that will hold the Client instance

  @ManyToOne(() => Adresse)
  @JoinColumn({ name: 'adr_dep_id' }) // Column name in the database table
  adr_dep: Adresse; // This is the property that will hold the Client instance


  @OneToMany(() => DeviItem, (devis_item) => devis_item.devis_id)
  devis_items: DeviItem[]; 

}
