import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeubleController } from './meuble.controller';
import { MeubleService } from './meuble.service';
import { Meuble } from 'src/models/meuble.model';

@Module({
  imports: [TypeOrmModule.forFeature([Meuble])],
  controllers: [MeubleController],
  providers: [MeubleService],
})
export class MeubleModule {}
