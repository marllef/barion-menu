import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: Props) => {
  const { className, ...rest } = props;
  return <button className="w-full bg-sky-500 rounded text-slate-50 font-semibold" {...rest} />;
};
