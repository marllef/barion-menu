import { Prisma } from "@prisma/client";

export type CategoryWithFood = Prisma.CategoryGetPayload<{
  include: { foods: true };
}>;
