import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/services/prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MenuCreateInput) {
    const menu = await this.prisma.menu.create({
      data: data,
      include: {
        categories: true,
      },
    });

    if (!menu) throw new Error('Falha ao criar menu.');

    return menu;
  }

  async findAll() {
    const menus = await this.prisma.menu.findMany({});
    return menus;
  }

  async findMenuById(id: number) {
    const menu = await this.prisma.menu.findFirst({
      where: {
        id,
      },
    });
    if (!menu) throw new Error('Menu não encontrado.');
    return menu;
  }

  async update(id: number, data: Prisma.MenuUpdateInput) {
    const updated = this.prisma.menu.update({
      data: data,
      where: {
        id,
      },
    });

    return updated;
  }

  async remove(id: number) {
    await this.prisma.menu.delete({
      where: {
        id,
      },
    });

    return `Menu ${id} deletado com sucesso!`;
  }
}
