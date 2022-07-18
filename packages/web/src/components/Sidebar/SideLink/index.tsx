import { ReactNode, useEffect } from "react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideLink.module.css";
import { FaRegFile } from "react-icons/fa";

interface Props {
  to: string;
  children?: ReactNode;
  icon?: IconType;
}

export const SideLink = ({ to, children, icon: Icon = FaRegFile }: Props) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link className={`${active && styles.active} ${styles.link} `} to={to}>
      <Icon size={16} />

      <span>{children}</span>
    </Link>
  );
};
