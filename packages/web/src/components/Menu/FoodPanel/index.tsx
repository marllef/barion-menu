import { Food } from "@prisma/client";
import { ScrollList } from "~/components/List/ScrollList";
import { TabContent } from "~/components/Tabs/Content";
import { FoodItem } from "../FoodItem";

interface Props {
  category: string;
  foods?: any[];
}

export const FoodPanel = ({ foods, category }: Props) => {
  const render = (item: Food, index: number) => {
    return <FoodItem key={index} data={item} />;
  };
  return (
    <TabContent tab={category}>
      <ScrollList source={foods} renderItem={render} />
    </TabContent>
  );
};
