import { Prisma, Store } from "@prisma/client";
import { api } from "~/configs/api";
import { StoreWithMenu } from "~/interfaces/api/APIStore";

export const StoreServices = {
  async find(code: string) {
    const response = await api.get<StoreWithMenu>(`/api/store/${code}`);

    return response.data;
  },

  async create(data: Prisma.StoreCreateInput) {
    const response = await api.post("/api/store", data);

    return response.data;
  },

  async update(code: string, data: Prisma.StoreUpdateInput) {
    const response = await api.post(`/api/store/${code}`, data);

    return response.data;
  },

  async delete(code: string) {
    const response = await api.delete(`/api/store/${code}`);

    return response.data;
  },
};
