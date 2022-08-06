import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "~/components/Menu";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { StoreServices } from "~/services/StoreServices";
import { NotFound } from "../NotFound";

export const MenuPage = () => {
  const { code } = useParams();
  const [menu, setMenu] = useState<MenuWithCategories>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (code) {
      StoreServices.find(code)
        .then((data) => {
          if (data) {
            setMenu(data.menu.find((item) => item.id === data.activeMenu));
          }
        })
        .catch(() => setError(true));
    }
  }, [code, setMenu, setError]);

  if (menu?.categories.length) {
    return (
      <div className="w-full h-full">
        <div className="flex bg-sky-300 h-28 justify-center items-center text-2xl font-semibold">
          {menu?.name}
        </div>
        <div className="mx-auto xl:max-w-3xl h-full">
          <Menu data={menu?.categories} />
        </div>
      </div>
    );
  }

  if (error) return <NotFound />;

  return <div>Carregando...</div>;
};
