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
import { MenuService } from './menu.service';

@Controller('/api/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() data: Prisma.MenuCreateInput) {
    return this.menuService.create(data);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.find(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.MenuUpdateInput) {
    return this.menuService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
