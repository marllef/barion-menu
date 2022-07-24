import { Prisma } from "@prisma/client";

export type UserAPI = Prisma.UserGetPayload<{
  include: { infoContact: true; store: true };
}>;
