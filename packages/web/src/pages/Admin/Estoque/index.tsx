import { Product } from "@prisma/client";
import { Form } from "@unform/web";
import { useEffect, useState } from "react";
import { Card } from "~/components/Card";
import { Select } from "~/components/Inputs/Select";
import { AdminLayout } from "~/components/Layout/Admin";
import { ListView } from "~/components/ListView";
import { AddProductModal as AddProduct } from "~/components/Modals/AddProduct";
import { Columm } from "~/components/Table/Column";
import { DataItem } from "~/components/Table/DataItem";
import { Row } from "~/components/Table/Row";
import { useAuth } from "~/hooks/useAuth";
import { useFetch } from "~/hooks/useFetch";
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
      <DataItem>{}</DataItem>
    </Row>
  );
};

export const Estoque = () => {
  const { user } = useAuth();
  const [source, setSource] = useState<Product[]>();

  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: menu } = useFetch<MenuWithCategories>(
    user?.menu.length ? `/api/menu/${user?.menu[0].id}` : null
  );

  useEffect(() => {
    if (menu) {
      if (selectedCategory) {
        const dataSource = menu.categories.find(
          (category) => category.id === Number(selectedCategory)
        )?.foods;

        setSource(dataSource);
      } else {
        const dataSource = menu.categories.flatMap((item) => [...item.foods]);
        setSource(dataSource);
      }
    }
  }, [menu, selectedCategory]);

  return (
    <AdminLayout>
      <Card className="p-2 h-full">
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="flex w-full justify-between pt-1 px-3 pb-3">
            <div className="flex space-x-2">
              <Form onSubmit={() => {}}>
                <Select
                  name="categories"
                  options={(menu?.categories || []).map((item) => ({
                    name: item.name,
                    value: `${item.id}`,
                  }))}
                  onChange={(event) =>
                    setSelectedCategory(event.currentTarget.value)
                  }
                  label="Categoria"
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
