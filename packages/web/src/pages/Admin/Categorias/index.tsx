import { Form } from "@unform/web";
import { useEffect, useState } from "react";
import { Card } from "~/components/Card";
import { Input } from "~/components/Inputs/Input";
import { AdminLayout } from "~/components/Layout/Admin";
import { ListView } from "~/components/ListView";
import { AddModal } from "./Actions/Create";
import { Columm } from "~/components/Table/Column";
import { useMenu } from "~/hooks/useMenu";
import { CategoryWithFood } from "~/interfaces/api/APICategory";
import { ListItem } from "./ListItem";

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
          <div className="flex w-full justify-between pt-1 px-2 pb-3">
            <div className="flex space-x-2">
              <Form className="flex w-40 h-9 space-x-2" onSubmit={() => {}}>
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

            <AddModal />
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
