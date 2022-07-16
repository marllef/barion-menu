import { HTMLAttributes, ReactNode, TableHTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
  className?: string;
}

export const HeaderRow = ({ children, className = "", ...rest }: Props) => {
  return (
    <tr
      className={`w-full sticky bg-white top-0 left-0 shadow ${className}`}
      {...rest}
    >
      {children}
    </tr>
  );
};
