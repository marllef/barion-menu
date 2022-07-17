import { Product } from "@prisma/client";
import { TabContent } from "~/components/Tabs/Content";
import { FoodItem } from "../FoodItem";

interface Props {
  category: string;
  foods?: Product[];
}

export const FoodPanel = ({ foods, category }: Props) => {
  return (
    <TabContent tab={category}>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <ul className="flex flex-col w-full h-full px-2 overflow-y-auto">
          {foods?.map((food: Product) => (
            <FoodItem key={food.id} data={food} />
          ))}
        </ul>
      </div>
    </TabContent>
  );
};
