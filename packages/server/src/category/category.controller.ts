import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryService } from './category.service';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() data: Prisma.MenuCategoryCreateInput) {
    return this.categoryService.create(data);
  }

  @Get()
  findAll(@Query('menuId') menuId: number) {
    return this.categoryService.findAllByMenu(+menuId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.MenuCategoryUpdateInput,
  ) {
    return this.categoryService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
