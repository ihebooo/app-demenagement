import { Body, Controller, Delete, Get, Param, 	UseGuards,
    Patch, Post ,UsePipes} from '@nestjs/common';
import { CustomValidation } from 'src/decorators/custom-validator.decorator';

import {  RequestDem } from '../../dtos/common.dto'
import { ClientService } from './client.service';

@Controller('/api')
@UsePipes(CustomValidation)

export class ClientController {
  constructor(private readonly ClientService: ClientService) {}



  @Post('/post-request')
  PostRequest(@Body() body : RequestDem) {

    return this.ClientService.postDem(body);

  }


}
