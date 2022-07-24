import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "~/components/Menu";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { MenuServices } from "~/services/MenuServices";

export const HomePage = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState<MenuWithCategories>();

  useEffect(() => {
    if (id) {
      MenuServices.findBySlug(id).then((data) => {
        setMenu(data);
      });
    }
  }, [id, setMenu]);

  if (menu?.categories.length) {
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
