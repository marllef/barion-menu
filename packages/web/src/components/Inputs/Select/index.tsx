import { ChangeEvent, SelectHTMLAttributes } from "react";

import styles from "./Select.module.css";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;

  options?: {
    value: string;
    name: string;
  }[];
}

export const Select = ({
  name,
  className = "",
  label = "Label",
  children,
  options = [],
  ...rest
}: Props) => {
  return (
    <label className={`group ${styles.container} ${className}`}>
      <span className={`${styles.label} peer-focus:bg-red-500`}>{label}</span>
      <select name={name} className={`${styles.input}`} {...rest}>
        <option value={""}>Selecione</option>
        {children}
        {(options || []).map((item, index) => (
          <option value={item.value} key={index}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
};
