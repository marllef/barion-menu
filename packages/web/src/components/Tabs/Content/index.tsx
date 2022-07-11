import { Content } from "@radix-ui/react-tabs";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  tab: string;
}

export const TabContent = ({ children, tab }: Props) => {
  return <Content value={tab}>{children}</Content>;
};
