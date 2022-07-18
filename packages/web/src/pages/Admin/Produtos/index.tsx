import { Product } from "@prisma/client";
import { Form } from "@unform/web";
import { useEffect, useMemo, useState } from "react";
import { Card } from "~/components/Card";
import { Input } from "~/components/Inputs/Input";
import { Select } from "~/components/Inputs/Select";
import { AdminLayout } from "~/components/Layout/Admin";
import { ListView } from "~/components/ListView";
import { AddProductModal as AddProduct } from "~/components/Modals/Product/Create";
import { Columm } from "~/components/Table/Column";
import { DataItem } from "~/components/Table/DataItem";
import { Row } from "~/components/Table/Row";
import { useAuth } from "~/hooks/useAuth";
import { useFetch } from "~/hooks/useFetch";
import { useMenu } from "~/hooks/useMenu";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { BRL } from "~/utils/currency";

interface ListItemProps {
  item: Product;
}

const ListItem = ({ item }: ListItemProps) => {
  function getStatus(value: number) {
    if (value >= 5) {
      return "Disponível";
    }

    if (value < 5) {
      return "Estoque Crítico";
    }

    return "Indisponível";
  }
  return (
    <Row>
      <DataItem>{item.id}</DataItem>
      <DataItem>{item.name}</DataItem>
      <DataItem>{item.desc}</DataItem>
      <DataItem>{BRL(item.price || 0)}</DataItem>
      <DataItem
        className={`${
          item.quantity >= 5 ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {getStatus(item.quantity)}
      </DataItem>
      <DataItem>{new Date(item?.updatedAt).toLocaleString()}</DataItem>
      <DataItem>Editar | Excluir</DataItem>
    </Row>
  );
};

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
          <div className="flex w-full justify-between pt-1 px-3 pb-3">
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
