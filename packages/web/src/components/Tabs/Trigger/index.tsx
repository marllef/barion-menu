import { useContext, useRef, useState } from "react";
import { Trigger } from "@radix-ui/react-tabs";
import { TabItemType } from "~/interfaces/Tabs";
import styles from "./TabItem.module.css";

interface Props {
  item: any;
}
export const TabItem = ({ item }: Props) => {
  const tabRef = useRef<HTMLButtonElement>(null);

  return (
    <Trigger
      ref={tabRef}
      className={styles.trigger}
      onClick={() => {
        tabRef.current?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }}
      value={`${item?.id}`}
    >
      {item?.name}
    </Trigger>
  );
};
