import { Root } from "@radix-ui/react-tabs";
import { createContext, ReactNode, useState } from "react";

interface Props {
  children?: ReactNode;
  defaultValue?: string;
}

export const Tabs = ({ children, defaultValue = "" }: Props) => {
  return <Root defaultValue={defaultValue}>{children}</Root>;
};
