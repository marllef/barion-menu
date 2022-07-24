import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProductCreateInput) {
    const food = await this.prisma.product.create({
      data,
    });

    return food;
  }

  async findAll() {
    const foods = await this.prisma.product.findMany({});
    return foods;
  }

  async findOne(id: number) {
    const food = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!food) throw new Error('Este produto não existe.');

    return food;
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    const updated = await this.prisma.product.update({
      data,
      where: {
        id,
      },
    });

    return updated;
  }

  async remove(id: number) {
    const deleted = await this.prisma.product.delete({
      where: {
        id,
      },
    });

    return deleted;
  }
}
