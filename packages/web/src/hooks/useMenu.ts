import { useEffect, useState } from "react";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { useAuth } from "./useAuth";
import { useFetch } from "./useFetch";

export const useMenu = <T = MenuWithCategories>(id: string = "") => {
  const { user } = useAuth();

  const { data, isValidating } = useFetch<T>(`/api/menu/${id}`);

  return { menu: data, loading: isValidating };
};
