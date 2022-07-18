import { Trigger } from "@radix-ui/react-tabs";
import { ReactNode } from "react";
import styles from './Tab.module.css'

interface TabProps {
  value: string;
  children?: ReactNode;
  clasName?: string;
  onClick?: { (value: string): void };
  disabled?: boolean;
}

export const Tab = ({
  value,
  children,
  clasName = "",
  disabled = false,
  onClick = () => {},
}: TabProps) => {
  return (
    <Trigger
      className={`${clasName} ${styles.tab}`}
      onClick={() => onClick(value)}
      value={value}
      disabled={disabled}
    >
      {children}
    </Trigger>
  );
};