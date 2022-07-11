import { useContext, useRef, useState } from "react";
import { Trigger } from "@radix-ui/react-tabs";
import { TabItemType } from "~/interfaces/Tabs";
import { TabsContext } from "..";
import styles from "./TabItem.module.css";

interface Props {
  item: TabItemType;
}
export const TabItem = ({ item }: Props) => {
  const tabRef = useRef<HTMLButtonElement>(null);

  if (typeof item === "string") {
    return (
      <Trigger
        ref={tabRef}
        className={styles.trigger}
        onClick={() =>
          tabRef.current?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
          })
        }
        value={item}
      >
        {item}
      </Trigger>
    );
  }

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
      value={item.id}
    >
      {item.value}
    </Trigger>
  );
};
