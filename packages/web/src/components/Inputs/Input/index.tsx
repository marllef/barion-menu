import { useField } from "@unform/core";
import { ElementType, InputHTMLAttributes, useEffect, useRef } from "react";

import styles from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  as?: ElementType;
}

export const Input = ({
  name,
  className = "",
  label = "Label",
  as: Element = "input",
  ...rest
}: Props) => {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error, clearError } =
    useField(name);

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
    <label className={`${styles.container} ${className}`}>
      <span className={`${styles.label}`}>{label}</span>
      <Element
        className={`${styles.input} ${error && styles.error}`}
        ref={inputRef}
        onFocus={clearError}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && (
        <span className={`${styles.message} ${error && styles.error}`}>
          {error}
        </span>
      )}
    </label>
  );
};
