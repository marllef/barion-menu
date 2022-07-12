import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/services/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MenuCategoryCreateInput) {
    const category = await this.prisma.menuCategory.create({
      data: data,
    });
    return category;
  }

  async findAll() {
    const categories = await this.prisma.menuCategory.findMany({});
    return categories;
  }

  async findAllByMenu(menuId: number) {
    const categories = await this.prisma.menuCategory.findMany({
      where: {
        menuId,
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        foods: true,
        menu: true,
      },
    });

    return categories;
  }

  async findById(id: number) {
    const category = await this.prisma.menuCategory.findFirst({
      where: {
        id,
      },
    });

    return category;
  }

  async update(id: number, data: Prisma.MenuCategoryUpdateInput) {
    const updated = await this.prisma.menuCategory.update({
      data,
      where: {
        id,
      },
    });
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.prisma.menuCategory.delete({
      where: {
        id,
      },
    });
    return deleted;
  }
}
