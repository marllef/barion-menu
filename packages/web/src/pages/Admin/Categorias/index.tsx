import { Category, Product } from "@prisma/client";
import { Form } from "@unform/web";
import { useEffect, useMemo, useState } from "react";
import { Card } from "~/components/Card";
import { Input } from "~/components/Inputs/Input";
import { Select } from "~/components/Inputs/Select";
import { AdminLayout } from "~/components/Layout/Admin";
import { ListView } from "~/components/ListView";
import { CreateCategoryModal } from "~/components/Modals/Categories/Create";
import { AddProductModal as AddProduct } from "~/components/Modals/Product/Create";
import { Columm } from "~/components/Table/Column";
import { DataItem } from "~/components/Table/DataItem";
import { Row } from "~/components/Table/Row";
import { useAuth } from "~/hooks/useAuth";
import { useFetch } from "~/hooks/useFetch";
import { useMenu } from "~/hooks/useMenu";
import { CategoryWithFood } from "~/interfaces/api/APICategory";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { BRL } from "~/utils/currency";

interface ListItemProps {
  item: CategoryWithFood;
}

const ListItem = ({ item }: ListItemProps) => {
  return (
    <Row>
      <DataItem>{item.id}</DataItem>
      <DataItem>{item.name}</DataItem>
      <DataItem>{item.foods.length}</DataItem>
      <DataItem>{new Date(item?.createdAt).toLocaleString()}</DataItem>
      <DataItem>{new Date(item?.updatedAt).toLocaleString()}</DataItem>
      <DataItem>Editar | Excluir</DataItem>
    </Row>
  );
};

export const AdminCategorias = () => {
  const [source, setSource] = useState<CategoryWithFood[]>([]);
  const [search, setSearch] = useState("");

  const { menu } = useMenu();

  useEffect(() => {
    if (menu) {
      const categories = menu.categories.filter((item) =>
        item.name.toUpperCase().includes(search)
      );
      setSource(categories);
    }
  }, [menu, search]);

  return (
    <AdminLayout>
      <Card className="p-2 h-full">
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="flex w-full justify-between pt-1 px-3 pb-3">
            <div className="flex space-x-2">
              <Form className="w-40 h-9" onSubmit={() => {}}>
                <Input
                  name="find"
                  label="Pesquisar"
                  placeholder="Pesquise aqui..."
                  onChange={(evt) =>
                    setSearch(evt.currentTarget.value.toUpperCase())
                  }
                />
              </Form>
            </div>

            <CreateCategoryModal />
          </div>

          <ListView
            source={source || []}
            render={(item, index) => <ListItem item={item} key={index} />}
          >
            <Columm>Id</Columm>
            <Columm>Categoria</Columm>
            <Columm>Produtos</Columm>
            <Columm>Criado em</Columm>
            <Columm>Atualizado em</Columm>
            <Columm>Ações</Columm>
          </ListView>
        </div>
      </Card>
    </AdminLayout>
  );
};
