import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "~/components/Menu";
import { useStore } from "~/hooks/useStore";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { StoreServices } from "~/services/StoreServices";

export const HomePage = () => {
  const { code } = useParams();
  const [menu, setMenu] = useState<MenuWithCategories>();

  const { store } = useStore(code);

  useEffect(() => {
    if (code) {
      StoreServices.find(code).then((data) => {
        if (data) {
          console.log(store?.code);
          setMenu(data.menu.find((item) => item.id === data.activeMenu));
        }
      });
    }
  }, [code, setMenu]);

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
