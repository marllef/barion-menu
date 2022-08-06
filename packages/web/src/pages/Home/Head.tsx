import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Head = ({ children, className: styles = "" }: Props) => {
  return (
    <header className={`w-full h-[30rem] bg-sky-300 ${styles}`}>{children}</header>
  );
};
