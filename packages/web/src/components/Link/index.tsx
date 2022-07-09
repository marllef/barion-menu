import { ReactNode } from "react";
import { Link as Anchor } from "react-router-dom";

interface Props {
  to: string;
  className?: string;
  children?: ReactNode;
}

export const Link = ({ to, className = "", ...rest }: Props) => {
  return <Anchor className={`${className} transition-colors`} to={to} {...rest} />;
};
