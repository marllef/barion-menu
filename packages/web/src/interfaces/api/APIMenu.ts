import { Prisma } from "@prisma/client";

export type MenuWithCategories = Prisma.MenuGetPayload<{
  include: {
    categories: {
      include: {
        foods: true;
      };
    };
  };
}>;
