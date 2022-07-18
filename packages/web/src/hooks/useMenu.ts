import { useEffect, useState } from "react";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { useAuth } from "./useAuth";
import { useFetch } from "./useFetch";

export const useMenu = () => {
  const { user } = useAuth();

  const { data, isValidating } = useFetch<MenuWithCategories>(
    user?.menu.length ? `/api/menu/${user?.menu[0].id}` : null
  );

  return { menu: data, loading: isValidating };
};
