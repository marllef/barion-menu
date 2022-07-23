import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "~/components/Menu";
import { useFetch } from "~/hooks/useFetch";
import { useMenu } from "~/hooks/useMenu";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { APICategory } from "~/interfaces/api/APIMenuCategory";
import { MenuServices } from "~/services/MenuServices";

export const HomePage = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState<MenuWithCategories>();
  // const { data } = useFetch<APICategory[]>("/api/category/?menuId=1");

  useEffect(() => {
    MenuServices.find(Number(id)).then((data) => {
      console.log(data);
      setMenu(data);
    });
  }, [id]);

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
