import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum AdresseType {
  Depart = 'depart',
  Arrivee = 'arrivee',
}

export function getAddressType(typeString: string): AdresseType | undefined {
  const typeEnumKeys = Object.keys(AdresseType);
  
  for (const key of typeEnumKeys) {
    if (AdresseType[key] === typeString) {
      return AdresseType[key];
    }
  }

  return undefined;
}


@Entity({ name: 'adresse' })
export class Adresse {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({
    type: 'enum',
    enum: AdresseType,
    nullable: false,
    name: 'type',
  })
  type: AdresseType;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'rue',
  })
  rue: string;

  @Column({
    type: 'integer',
    nullable: false,
    name: 'code_postal',
  })
  code_postal: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'ville',
  })
  ville: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'pays',
  })
  pays: string;
}
