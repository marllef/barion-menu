import { ReactNode, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

interface Props {
  children?: ReactNode;
  className?: string;
  title?: string;
  defaultClose?: boolean;
}

export const SideSection = ({
  children,
  className = "",
  title = "Section",
  defaultClose = false,
}: Props) => {
  const [close, setClose] = useState(defaultClose);

  function handleClick() {
    setClose((old) => !old);
  }

  return (
    <div
      className={`${className} text-slate-800 select-none relative space-y-1`}
    >
      <span className="absolute right-1 top-2">
        {close ? <MdArrowDropDown /> : <MdArrowDropUp />}
      </span>
      <div
        className="flex w-full justify-start text-slate-600 items-center border-b cursor-pointer uppercase text-xs p-2"
        onClick={handleClick}
      >
        {title}
      </div>
      <div className={`${close ? "hidden" : "block"} space-y-1`}>
        {children}
      </div>
    </div>
  );
};
