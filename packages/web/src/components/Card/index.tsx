import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: Props) => {
  return (
    <div
      className={`flex w-full rounded h-full bg-white overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};
