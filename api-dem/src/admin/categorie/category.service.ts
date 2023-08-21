import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/models/categorie.model';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find({
      relations:["meubles"]
    });
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({where:{id:id}});;
  }

  async update(id: number, updateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto);
    return await this.categoryRepository.findOne({where:{id:id}});
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return await this.categoryRepository.remove(category);
  }
}
