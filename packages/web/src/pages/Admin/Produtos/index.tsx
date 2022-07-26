import { Product } from "@prisma/client";
import { Form } from "@unform/web";
import { useEffect, useState } from "react";
import { Card } from "~/components/Card";
import { Input } from "~/components/Inputs/Input";
import { Select } from "~/components/Inputs/Select";
import { AdminLayout } from "~/components/Layout/Admin";
import { ListView } from "~/components/ListView";
import { CreateModal as AddProduct } from "./Actions/Create";
import { Columm } from "~/components/Table/Column";
import { useMenu } from "~/hooks/useMenu";
import { ListItem } from "./ListItem";

export const AdminProdutos = () => {
  const [source, setSource] = useState<Product[]>();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  const { menu } = useMenu();

  useEffect(() => {
    if (menu) {
      if (selectedCategory) {
        const dataSource = menu.categories.find(
          (category) => category.id === Number(selectedCategory)
        )?.foods;

        setSource(
          dataSource?.filter((item) => item.name.toLowerCase().includes(search))
        );
      } else {
        const dataSource = menu.categories.flatMap((item) => [...item.foods]);
        setSource(
          dataSource.filter((item) => item.name.toLowerCase().includes(search))
        );
      }
    }
  }, [menu, selectedCategory, search]);

  return (
    <AdminLayout>
      <Card className="p-2 h-full">
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="flex w-full justify-between pt-1 px-2 pb-3">
            <div className="flex space-x-2">
              <Form className="flex w-40 space-x-2 h-9" onSubmit={() => {}}>
                <Select
                  name="categories"
                  options={(menu?.categories || []).map((category) => ({
                    name: category.name,
                    value: `${category.id}`,
                  }))}
                  onChange={(event) =>
                    setSelectedCategory(event.currentTarget.value)
                  }
                  label="Categoria"
                />

                <Input
                  name="find"
                  label="Pesquisar"
                  placeholder="Pesquise aqui..."
                  onChange={(e) =>
                    setSearch(e.currentTarget.value.toLowerCase())
                  }
                />
              </Form>
            </div>

            <AddProduct />
          </div>

          <ListView
            source={source || []}
            render={(item, index) => <ListItem item={item} key={index} />}
          >
            <Columm>Id</Columm>
            <Columm>Produto</Columm>
            <Columm>Descrição</Columm>
            <Columm>Preço</Columm>
            <Columm>Estoque</Columm>
            <Columm>Atualizado em</Columm>
            <Columm>Ações</Columm>
          </ListView>
        </div>
      </Card>
    </AdminLayout>
  );
};
