import { Prisma } from "@prisma/client";
import { api } from "~/configs/api";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";

export const MenuServices = {
  async create(data: Prisma.MenuCreateInput) {
    const response = await api.post<MenuWithCategories>("/api/menu", data);

    return response.data;
  },

  async find(id: number) {
    const response = await api.get<MenuWithCategories>(`/api/menu/${id}`);

    return response.data;
  },

  async findByStore(code: string) {
    const response = await api.get<MenuWithCategories>(
      `/api/menu/slug/${code}`
    );

    return response.data;
  },

  async update(id: number, data: Prisma.MenuUpdateInput) {
    const response = await api.post<MenuWithCategories>(
      `/api/store/${id}`,
      data
    );

    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete(`/api/menu/${id}`);

    return response.data;
  },
};
