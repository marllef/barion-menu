import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { JwtAuthGuard } from '~/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: Prisma.UserCreateInput) {
    const user = await this.usersService.create(data);

    user.password = undefined;

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);

    user.password = undefined;

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    const user = await this.usersService.update(id, data);

    user.password = undefined;

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);

    user.password = undefined;

    return user;
  }
}
