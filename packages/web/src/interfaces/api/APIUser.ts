import { Prisma } from "@prisma/client";

export interface UserAPI
  extends Prisma.UserGetPayload<{
    include: { menu: true; infoContact: true };
  }> {}
