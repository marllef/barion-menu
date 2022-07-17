import { Prisma } from "@prisma/client";

export interface CategoryWithFood
  extends Prisma.CategoryGetPayload<{ include: { foods: true } }> {}
