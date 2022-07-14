import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: Props) => {
  const { className = "", ...rest } = props;
  return <button className={`${styles.btn} ${className}`} {...rest} />;
};
