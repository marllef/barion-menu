import { HTMLAttributes, ReactNode, TableHTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
  className?: string;
}

export const Row = ({ children, className = "", ...rest }: Props) => {
  return (
    <tr className={`odd:bg-slate-50 ${className}`} {...rest}>
      {children}
    </tr>
  );
};
