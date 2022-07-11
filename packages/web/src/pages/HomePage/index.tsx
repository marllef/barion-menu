import { Menu } from "~/components/Menu";

const foods = [
  {
    category: "Lanche",
    foods: [
      {
        name: "Hamburguer",
        price: 1.5,
        desc: "Hamburguer artesanal.",
        avaible: true,
        img: "",
      },
      {
        name: "Omelete",
        price: 0.5,
        desc: "Omelete artesanal.",
        avaible: true,
        img: "",
      },
    ],
  },
  {
    category: "Bebidas",
    foods: [
      {
        name: "Coca-Cola",
        price: 5,
        desc: "Coca-Cola Gelada.",
        avaible: true,
        img: "",
      },
      {
        name: "Sprite",
        price: 4,
        desc: "Sprite sabor limão.",
        avaible: true,
        img: "",
      },
    ],
  },
];

export const HomePage = () => {
  const items = foods;
  return (
    <div className="w-full h-full">
      <div className="flex bg-sky-300 h-28">Square</div>
      <Menu data={items} />
    </div>
  );
};
