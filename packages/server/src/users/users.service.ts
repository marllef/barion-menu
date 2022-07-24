import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ password, ...rest }: Prisma.UserCreateInput) {
    await this.prisma.user.findFirst({
      where: {
        email: rest.email,
      },
    });

    const salts = 10;
    const hash = await bcrypt.hash(password, salts);

    const user = await this.prisma.user.create({
      data: {
        password: hash,
        ...rest,
      },
    });

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        email: true,
        id: true,
        name: true,
        roles: true,
      },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        store: true,
        infoContact: true,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async update(id: string, { password, ...rest }: Prisma.UserUpdateInput) {
    let hash = undefined;

    if (typeof password === 'string') {
      const salts = 10;
      hash = await bcrypt.hash(password, salts);
    }

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hash,
        ...rest,
      },
    });

    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  }
}
