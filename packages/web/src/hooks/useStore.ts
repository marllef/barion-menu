import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { StoreWithMenu } from "~/interfaces/api/APIStore";
import { useAuth } from "./useAuth";
import { useFetch } from "./useFetch";

export const useStore = <T = StoreWithMenu>(code: string = "") => {
  const { user } = useAuth();

  const { data, isValidating } = useFetch<T>(
    code
      ? `/api/store/${code}`
      : user?.store?.code
      ? `/api/store/${user.store.code}`
      : null
  );

  return { store: data, loading: isValidating };
};
