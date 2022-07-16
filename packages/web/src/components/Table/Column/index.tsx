import { ThHTMLAttributes } from "react";
import styles from "./Columm.module.css";

interface Props extends ThHTMLAttributes<HTMLTableCellElement> {}

export const Columm = ({ className, ...rest }: Props) => {
  return <th className={` ${styles.container} ${className} `} {...rest} />;
};
