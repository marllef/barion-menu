import { Prisma, Product } from "@prisma/client";
import { api } from "~/configs/api";

export const ProductServices = {
  async find(id: number) {
    const response = await api.get<Product>(`/api/food/${id}`);

    return response.data;
  },

  async create(data: Prisma.ProductCreateInput) {
    const response = await api.post("/api/food", data);

    return response.data;
  },

  async update(id: number, data: Prisma.ProductUpdateInput) {
    const response = await api.post(`/api/food/${id}`, data);

    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete(`/api/food/${id}`);

    return response.data;
  },
};
