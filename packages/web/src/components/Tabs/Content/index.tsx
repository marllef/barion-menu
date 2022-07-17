import { Content } from "@radix-ui/react-tabs";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  tab: string;
  className?: string;
}

export const TabContent = ({ children, tab, className = "" }: Props) => {
  return (
    <Content className={`${className}`} value={tab}>
      {children}
    </Content>
  );
};
