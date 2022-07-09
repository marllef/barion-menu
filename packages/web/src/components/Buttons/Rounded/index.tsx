import { ButtonHTMLAttributes } from "react";

import styles from "./RoundedButton.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const RoundedButton = ({ className, ...rest }: Props) => {
  return <button className={`${className} ${styles.button}`} {...rest} />;
};
