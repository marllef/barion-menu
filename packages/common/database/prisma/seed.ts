import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("1234", 10);

  const menu = await prisma.menu.create({
    data: {
      name: "Gourmet's Potatos",
      slug: "gourmet",
      user: {
        connectOrCreate: {
          where: {
            email: "marllef.alves@gmail.com",
          },
          create: {
            email: "marllef.alves@gmail.com",
            name: "Marllef Hyorrane Alves de Freitas",
            password,
            currentMenu: 1,
          },
        },
      },
      categories: {
        create: {
          name: "Pizzas",
          active: true,
          foods: {
            create: {
              name: "Pizza G - Calabresa",
              price: 29.99,
              desc: "Deliciosa pizza sabor calabresa!",
              active: true,
              quantity: faker.datatype.number({ min: 1, max: 50 }),
              tags: ["Italiano", "Especial", "Grande"],
            },
          },
        },
      },
    },
  });

  await prisma.category.createMany({
    data: [
      {
        name: "Bebidas",
        active: true,
        menuId: menu.id,
      },
      {
        name: "Lanches",
        active: true,
        menuId: menu.id,
      },
      {
        name: "Almoço",
        active: true,
        menuId: menu.id,
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Pizza M - Calabresa",
        price: faker.commerce.price(10, 80, 2),
        active: true,
        desc: "Pizza média deliciosa sabor calabresa!",
        quantity: 9,

        tags: ["Italiano", "Especial", "Média"],
      },
      {
        name: "Pizza P - Calabresa",
        price: faker.commerce.price(10, 80, 2),
        active: true,
        desc: "Pizza pequena deliciosa sabor calabresa!",
        quantity: faker.datatype.number({ min: 1, max: 20 }),
        tags: ["Italiano", "Especial", "Pequena"],
      },
    ],
  });

  console.log({ menu });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
