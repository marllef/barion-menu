import { Prisma } from "@prisma/client";

export interface APICategory
  extends Prisma.CategoryGetPayload<{
    include: {
      foods: true;
      menu: true;
    };
  }> {}
