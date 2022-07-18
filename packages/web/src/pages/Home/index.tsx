import { useEffect } from "react";
import { Menu } from "~/components/Menu";
import { useFetch } from "~/hooks/useFetch";
import { useMenu } from "~/hooks/useMenu";
import { APICategory } from "~/interfaces/api/APIMenuCategory";

export const HomePage = () => {
  // const { data } = useFetch<APICategory[]>("/api/category/?menuId=1");
  const { menu } = useMenu();

  if (menu) {
    return (
      <div className="w-full h-full">
        <div className="flex bg-sky-300 h-28 justify-center items-center text-2xl font-semibold">
          {menu?.name}
        </div>
        <div className="mx-auto xl:max-w-3xl h-full">
          {<Menu data={menu?.categories} />}
        </div>
      </div>
    );
  }

  return <div>Carregando...</div>;
};
