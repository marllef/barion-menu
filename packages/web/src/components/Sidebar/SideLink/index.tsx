import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideLink.module.css";

interface Props {
  to: string;
  children?: ReactNode;
}

export const SideLink = ({ to, children }: Props) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link className={`${active && styles.active} ${styles.link} `} to={to}>
      {children}
    </Link>
  );
};
