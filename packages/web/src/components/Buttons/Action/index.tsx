import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blue" | "green" | "red" | "black" | "white" | "yellow";
}

export const ActionButton = (props: Props) => {
  const { className, variant = "blue", ...rest } = props;

  const variants = {
    blue: "text-sky-600 hover:text-sky-700",
    red: "text-red-600 hover:text-red-700",
    green: "text-emerald-600 hover:text-emerald-700",
    yellow: "text-ambar-600 hover:text-ambar-700",
    black: "text-slate-700 hover:text-slate-900",
    white: "text-white hover:text-slate-50",
  };

  return (
    <button
      className={`${className} ${variants[variant]} select-none`}
      {...rest}
    />
  );
};
