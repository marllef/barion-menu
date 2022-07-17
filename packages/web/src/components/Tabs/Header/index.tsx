import { List } from "@radix-ui/react-tabs";
import { TabItem } from "../Trigger";

interface Props {
  categories?: {
    id: number;
    name: string;
  }[];
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

