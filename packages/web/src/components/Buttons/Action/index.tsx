import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blue" | "green" | "red" | "black" | "white" | "yellow";
}

export const ActionButton = (props: Props) => {
  const { className, variant = "blue", ...rest } = props;

  const variants = {
    blue: "text-sky-600 hover:text-sky-700 hover:bg-sky-100",
    red: "text-red-600 hover:text-red-700 hover:bg-red-100",
    green: "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100",
    yellow: "text-amber-600 hover:text-amber-700 hover:bg-amber-100",
    black: "text-slate-700 hover:text-slate-900 hover:bg-slate-300",
    white: "text-white hover:text-slate-50 hover:bg-sky-100",
  };

  return (
    <button
      className={`${className} ${variants[variant]} select-none px-2 py-1 rounded transition-colors`}
      {...rest}
    />
  );
};
