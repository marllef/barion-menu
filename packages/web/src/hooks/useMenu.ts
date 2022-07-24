import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { useAuth } from "./useAuth";
import { useFetch } from "./useFetch";

export const useMenu = <T = MenuWithCategories>(id: string = "") => {
  const { user } = useAuth();

  const { data, isValidating } = useFetch<T>(
    id
      ? `/api/menu/${id}`
      : user?.store?.activeMenu
      ? `/api/menu/${user?.store?.activeMenu}`
      : null
  );

  return { menu: data, loading: isValidating };
};
