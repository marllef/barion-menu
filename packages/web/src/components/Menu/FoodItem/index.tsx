import { Food } from "@prisma/client";
import currency from "currency.js";
import styles from "./FoodItem.module.css";

interface Props {
  data: Food;
}

export const FoodItem = ({ data }: Props) => {
  return (
    <li className={styles.container}>
      <div className={styles.food_img}></div>
      <div className={styles.info_content}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.desc}>{data.desc}</div>
        <div className={styles.price}>
          {currency(Number(data.price)).format({
            decimal: ",",
            separator: ".",
            symbol: "R$",
          })}
        </div>
      </div>
    </li>
  );
};
