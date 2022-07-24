import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { StoreService } from './store.service';

@Controller('/api/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() data: Prisma.StoreCreateInput) {
    return this.storeService.create(data);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.storeService.findOne(code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() data: Prisma.StoreCreateInput) {
    return this.storeService.update(code, data);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.storeService.remove(code);
  }
}
