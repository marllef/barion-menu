import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/services/prisma.service';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.FoodCreateInput) {
    const food = await this.prisma.food.create({
      data,
    });
    
    return food;
  }

  async findAll() {
    const foods = await this.prisma.food.findMany({});
    return foods;
  }

  async findOne(id: number) {
    const food = await this.prisma.food.findFirst({
      where: {
        id,
      },
    });

    if (!food) throw new Error('Este produto não existe.');

    return food;
  }

  async update(id: number, data: Prisma.FoodUpdateInput) {
    const updated = await this.prisma.food.update({
      data,
      where: {
        id,
      },
    });

    return updated;
  }

  async remove(id: number) {
    const deleted = await this.prisma.food.delete({
      where: {
        id,
      },
    });

    return deleted;
  }
}
