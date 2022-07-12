import { MenuCategory, Prisma } from "@prisma/client";
import { APICategory } from "~/interfaces/api/APIMenuCategory";
import { Tabs } from "../Tabs";
import { TabContent } from "../Tabs/Content";
import { TabHeader } from "../Tabs/Header";
import { FoodPanel } from "./FoodPanel";

interface Props {
  data: APICategory[];
}

export const Menu = ({ data: items }: Props) => {
  return (
    <Tabs defaultValue={`${items[0].id}`}>
      <TabHeader
        categories={items?.map((item) => ({ name: item.name, id: item.id }))}
      />

      {items.map((item, index) => {
        return (
          <FoodPanel key={index} category={`${item.id}`} foods={item.foods} />
        );
      })}
    </Tabs>
  );
};
