import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput) {
    const category = await this.prisma.category.create({
      data: data,
    });
    return category;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({});
    return categories;
  }

  async findAllByMenu(menuId: number) {
    const categories = await this.prisma.category.findMany({
      where: {
        menuId,
      },
      orderBy: {
        name: 'desc',
      },
      include: {
        foods: true,
        menu: true,
      },
    });

    return categories;
  }

  async findById(id: number) {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
      },
      include: {
        foods: true,
      },
    });

    return category;
  }

  async update(id: number, data: Prisma.CategoryUpdateInput) {
    const updated = await this.prisma.category.update({
      data,
      where: {
        id,
      },
    });
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.prisma.category.delete({
      where: {
        id,
      },
    });
    return deleted;
  }
}
