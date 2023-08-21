import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meuble } from 'src/models/meuble.model';
@Injectable()
export class MeubleService {
  constructor(
    @InjectRepository(Meuble)
    private MeubleRepository: Repository<Meuble>,
  ) {}

  async create(createMeubleDto) {
    const Meuble = this.MeubleRepository.create(createMeubleDto);
    return await this.MeubleRepository.save(Meuble);
  }

  async findAll() {
    return await this.MeubleRepository.find({
      relations:["category"]
    });
  }

  async findOne(id: number) {
    return await this.MeubleRepository.findOne({where:{id:id}});;
  }

  async update(id: number, updateMeubleDto) {
    await this.MeubleRepository.update(id, updateMeubleDto);
    return await this.MeubleRepository.findOne({where:{id:id}});
  }

  async remove(id: number) {
    const Meuble = await this.findOne(id);
    if (!Meuble) {
      throw new Error('Meuble not found');
    }
    return await this.MeubleRepository.remove(Meuble);
  }
}
