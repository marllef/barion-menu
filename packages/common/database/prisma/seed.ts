import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {

  const menu = await prisma.menu.create({
    data: {
      name: faker.company.companyName(),
      slug: faker.unique(faker.name.firstName).toLowerCase(),
      user: {
        connect: {
          email: "marllef.alves@gmail.com",
        },
      },
      categories: {
        create: {
          name: faker.commerce.department(),
          active: true,
          foods: {
            create: {
              name: faker.commerce.productMaterial(),
              price: faker.commerce.price(1, 50, 2),
              desc: faker.commerce.productDescription(),
              active: true,
              quantity: faker.datatype.number({ min: 1, max: 50 }),
            },
          },
        },
      },
    },
  });

  console.log({ menu });
}

for (let i = 0; i < 20; i++) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
