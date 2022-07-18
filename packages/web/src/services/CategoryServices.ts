import { Prisma } from "@prisma/client";
import { api } from "~/configs/api";

export class CategoryServices {
  constructor() {}

  async create(data: Prisma.CategoryCreateInput) {
    const response = await api.post("/api/category", data);
    
  }

  async update(data: Prisma.CategoryUpdateInput) {}
}
