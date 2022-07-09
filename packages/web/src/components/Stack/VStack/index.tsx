import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export const VStack = ({ children, className = "" }: Props) => {
  return <div className={`${className} space-y-2 p-1 w-full`}>{children}</div>;
};
