import { Tabs } from "../Tabs";
import { TabContent } from "../Tabs/Content";
import { TabHeader } from "../Tabs/List";
import { FoodPanel } from "./FoodPanel";

interface Props {
  data: any[];
}

export const Menu = ({ data: items }: Props) => {
  return (
    <Tabs defaultValue={items[0].category}>
      <TabHeader categories={items.map((item) => item.category)} />

      {items.map((item, index) => {
        return (
          <FoodPanel key={index} category={item.category} foods={item.foods} />
        );
      })}
    </Tabs>
  );
};
