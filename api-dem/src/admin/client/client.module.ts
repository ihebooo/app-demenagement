import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

import { DeviItem } from 'src/models/devi_item.model';
import { Devis } from 'src/models/devis.model';
import { Adresse } from 'src/models/adresse.model';
import {Client}  from 'src/models/client.model'
@Module({
  imports: [TypeOrmModule.forFeature([DeviItem,Devis,Adresse,Client])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
