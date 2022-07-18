import { Prisma } from "@prisma/client";
import { api } from "~/configs/api";

export const CategoryServices = {
  async create(data: Prisma.CategoryCreateInput) {
    const response = await api.post("/api/category", data);

    return response.data;
  },

  async update(id: number, data: Prisma.CategoryUpdateInput) {
    const response = await api.post(`/api/category/${id}`, data);

    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete(`/api/category/${id}`);

    return response.data;
  },
};
