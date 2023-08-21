import { Body, Controller, Delete, Get, Param, 	UseGuards,
    Patch, Post ,UsePipes} from '@nestjs/common';
import { CustomValidation } from 'src/decorators/custom-validator.decorator';

    /*** auth ***/

import { RolesGuard } from 'src/admin/auth/roles.guard';
import { HasRoles } from 'src/admin/auth/has-roles.decorator';
import { LocalAuthGuard } from 'src/admin/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/admin/auth/jwt-auth.guard';
import { UserRoles } from 'src/admin/auth/user-roles.enum';

import { CategoryService } from './category.service';

@Controller('categories')
@UsePipes(CustomValidation)

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(
      UserRoles.Admin,
      
  )
  @Post('add')
  create(@Body() createCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(
      UserRoles.Admin,
      
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(
      UserRoles.Admin,
      
  )
  @Post('update/:id')
  update(@Param('id') id: string, @Body() body) {
    return this.categoryService.update(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(
      UserRoles.Admin,
      
  )
  @Post('remove/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
