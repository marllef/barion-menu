import { List } from "@radix-ui/react-tabs";
import { TabItemType } from "~/interfaces/Tabs";
import { TabItem } from "../Item";

interface Props {
  categories?: TabItemType[];
}

export const TabHeader = ({ categories: items }: Props) => {
  return (
    <List className="flex w-full sticky top-0 left-0 overflow-hidden">
      {items?.map((item, index) => (
        <TabItem item={item} key={index} />
      ))}
    </List>
  );
};
