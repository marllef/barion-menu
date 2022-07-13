import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  title?: string;
}

export const SideSection = ({
  children,
  className = "",
  title = "Section",
}: Props) => {
  return (
    <div className={`${className} text-slate-800 border-b select-none`}>
      <div className="flex w-full justify-center text-slate-600  items-center uppercase text-xs p-2 border-b">
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
};
