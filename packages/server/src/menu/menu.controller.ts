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
  findAll(@Query('userId') userId: string) {
    return this.menuService.findAll();
  }

  @Get('by/user/:userId')
  findByUser(@Query('userId') userId: string) {
    return this.menuService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findMenuById(+id);
  }

  @Get('by/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.menuService.findBySlug(slug);
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
