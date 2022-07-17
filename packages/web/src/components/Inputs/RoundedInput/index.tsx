import { useField } from "@unform/core";
import { InputHTMLAttributes, useEffect, useRef } from "react";

import styles from "./BaseInput.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export const RoundedInput = ({
  name,
  className = "",
  label = "Label",
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
    <label className={`group ${styles.container} ${className}`}>
      <span className={`${styles.label} peer-focus:bg-red-500`}>{label}</span>
      <input
        className={`${styles.input} ${error && styles.error}`}
        ref={inputRef}
        onFocus={clearError}
        defaultValue={defaultValue}
        {...rest}
      />
      <span className={`${styles.message} ${error && styles.error}`}>
        {error}
      </span>
    </label>
  );
};
