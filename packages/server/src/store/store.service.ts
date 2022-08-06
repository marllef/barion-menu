import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.StoreCreateInput) {
    const created = await this.prisma.store.create({
      data: data,
    });

    return `A loja ${created.name} foi cadastrada!`;
  }

  async findAll() {
    const stores = await this.prisma.store.findMany({
      include: {
        menu: {
          include: {
            categories: {
              include: {
                foods: true,
              },
            },
          },
        },
      },
    });

    return stores;
  }

  async findOne(code: string) {
    const store = await this.prisma.store.findFirst({
      where: {
        code,
      },
      include: {
        menu: {
          include: {
            categories: {
              include: {
                foods: true,
              },
            },
          },
        },
      },
    });

    if (!store) throw new NotFoundException('Nenhuma loja encontrada');

    return store;
  }

  async update(code: string, data: Prisma.StoreUpdateInput) {
    const updated = await this.prisma.store.update({
      where: {
        code,
      },
      data,
    });

    return `A loja ${updated.name} foi atualizada!`;
  }

  async remove(code: string) {
    const removed = await this.prisma.store.delete({
      where: {
        code,
      },
    });

    return `A loja ${removed.name} foi deletada!`;
  }
}
