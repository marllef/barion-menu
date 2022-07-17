import { Prisma } from "@prisma/client";

export interface MenuWithCategories
  extends Prisma.MenuGetPayload<{
    include: {
      categories: {
        include: {
          foods: true;
        };
      };
    };
  }> {}
