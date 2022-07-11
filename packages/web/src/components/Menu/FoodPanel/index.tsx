import { ScrollList } from "~/components/List/ScrollList";
import { TabContent } from "~/components/Tabs/Content";
import { FoodItem } from "../FoodItem";

interface Props {
  category: string;
  foods?: any[];
}

export const FoodPanel = ({ foods, category }: Props) => {
  const render = (item: any, index: number) => {
    return <FoodItem />;
  };
  return (
    <TabContent tab={category}>
      <ScrollList source={foods} renderItem={render} />
    </TabContent>
  );
};
