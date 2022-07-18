import { Prisma } from "@prisma/client";
import { api } from "~/configs/api";

export const ProductServices = {
  async create(data: Prisma.ProductCreateInput) {
    const response = await api.post("/api/food", data);

    return response.data;
  },

  async update(id: number, data: Prisma.CategoryUpdateInput) {
    const response = await api.post(`/api/food/${id}`, data);
    return response.data;
  },
};
