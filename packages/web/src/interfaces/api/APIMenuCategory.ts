import { Prisma } from "@prisma/client";

export type APICategory
  = Prisma.CategoryGetPayload<{
    include: {
      foods: true;
      menu: true;
    };
  }> 
