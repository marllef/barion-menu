import { useField } from "@unform/core";
import { ChangeEvent, SelectHTMLAttributes, useEffect, useRef } from "react";

import styles from "./Select.module.css";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;

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
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <label className={`group ${styles.container} ${className}`}>
      <span className={`${styles.label} peer-focus:bg-red-500`}>{label}</span>
      <select
        ref={inputRef}
        name={name}
        className={`${styles.input}`}
        {...rest}
      >
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
