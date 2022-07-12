import { Prisma } from "@prisma/client";

export interface APICategory
  extends Prisma.MenuCategoryGetPayload<{
    include: {
      foods: true;
      menu: true;
    };
  }> {}
