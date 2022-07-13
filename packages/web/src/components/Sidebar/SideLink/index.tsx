import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./SideLink.module.css";

interface Props {
  to: string;
  children?: ReactNode;
}

export const SideLink = ({ to, children }: Props) => {
  return (
    <Link className={styles.link} to={to}>
      {children}
    </Link>
  );
};
