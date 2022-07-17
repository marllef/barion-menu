import { Product } from "@prisma/client";
import currency from "currency.js";
import { Link } from "react-router-dom";
import styles from "./FoodItem.module.css";

interface Props {
  data: Product;
}

export const FoodItem = ({ data }: Props) => {
  return (
    <Link to={`/produto/${data.id}`}>
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
    </Link>
  );
};
