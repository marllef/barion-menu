import { Prisma } from "@prisma/client";

export type StoreWithMenu = Prisma.StoreGetPayload<{
  include: {
    menu: {
      include: {
        categories: {
          include: {
            foods: true;
          };
        };
      };
    };
  };
}>;
