import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export const DataItem = ({ className, ...rest }: Props) => {
  return <td className={`${className} p-1 text-center`} {...rest} />;
};
