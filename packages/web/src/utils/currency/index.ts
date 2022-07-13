import currency from "currency.js";

export const BRL = (value: any) =>
  currency(Number(value), {
    decimal: ",",
    separator: ".",
    symbol: "R$",
  }).format();
