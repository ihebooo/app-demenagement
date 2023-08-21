import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,DataSource } from 'typeorm';
import { DeviItem } from 'src/models/devi_item.model';
import { Devis } from 'src/models/devis.model';
import {Client}  from 'src/models/client.model'
import { Adresse,getAddressType } from 'src/models/adresse.model';

import { isEmpty } from '../../utils/global/index'
@Injectable()



export class ClientService {
  constructor(

    private dataSource:DataSource,
    @InjectRepository(DeviItem)
    private deviItemModel: Repository<DeviItem>,
    @InjectRepository(Devis)
    private devisModel: Repository<Devis>,
    @InjectRepository(Adresse)
    private adresseModel: Repository<Adresse>,
    @InjectRepository(Client)
    private clientModel: Repository<Client>,

  ) {}



  async postDem(body) {
    
    let { form_client, form_address, meubles} = body

    
    const query =  this.dataSource.createQueryRunner();
    try {


      await query.connect()
      await query.startTransaction()

      
      //insert address depart
      const depAdresse = new Adresse();
      depAdresse.type = getAddressType(form_address.dep.type);
      depAdresse.rue = form_address.dep.rue;
      depAdresse.code_postal = form_address.dep.code_postal;
      depAdresse.ville = form_address.dep.ville;
      depAdresse.pays = form_address.dep.pays;

      // Save Adresse instances
      const savedDepAdresse = await query.manager.save(Adresse, depAdresse)
      //insert address arrivé
      const arrAdresse = new Adresse();
      arrAdresse.type = getAddressType(form_address.arr.type);
      arrAdresse.rue = form_address.arr.rue;
      arrAdresse.code_postal = form_address.arr.code_postal;
      arrAdresse.ville = form_address.arr.ville;
      arrAdresse.pays = form_address.arr.pays;

      // Save Adresse instances
      const savedArrAdresse = await query.manager.save(Adresse, arrAdresse)
      

      let savedClient : Client = null

      const existedClient = await this.clientModel.findOne({where : { email : form_client.email}});



      if(!isEmpty(existedClient)){

            savedClient = existedClient 

            console.log("client deja exit")

      }else{

          //insert client
          const client = new Client();
          client.nom_prenom = form_client.nom_prenom
          client.email = form_client.email
          client.tel = form_client.tel

          // Save client instance
          savedClient =  await query.manager.save(Client, client)

          console.log("insert new  client")

      }


      //insert Devis
      const devis = new Devis();
            devis.client_id = savedClient.id;
            devis.adr_arr_id = savedArrAdresse.id;
            devis.adr_dep_id = savedDepAdresse.id;
            devis.date_dem	 = new Date(form_client.date)
            devis.message = form_client.message


      // Save Devis instance
      const savedDevis =  await query.manager.save(Devis, devis)
      



      let devis_items : DeviItem[] = []

      for(let i=0; i < meubles.length; i++){


        let devis_item = new DeviItem();

            devis_item.devis_id = savedDevis.id

            devis_item.meuble_id = meubles[i].id
            devis_item.quantite  = meubles[i].quantity

            //push to table devisItems 
            devis_items.push(devis_item);
      }


      // Save Multiple Devis Items (array[])
      const savedDevisItems =  await query.manager.save(DeviItem, devis_items)


      await query.commitTransaction();
    
      return {status :true, message : "successfully"}


    } catch (error) {

      console.log({error})
      await query.rollbackTransaction(); 
     throw  new Error(error)

    } finally {
      await query.release();
    }



  
  }


}
