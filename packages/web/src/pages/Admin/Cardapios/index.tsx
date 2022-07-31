import { Form } from "@unform/web";
import { useEffect, useState } from "react";
import { Card } from "~/components/Card";
import { Input } from "~/components/Inputs/Input";
import { AdminLayout } from "~/components/Layout/Admin";
import { ListView } from "~/components/ListView";
import { Columm } from "~/components/Table/Column";

import { useStore } from "~/hooks/useStore";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { CreateModal } from "./Actions/Create";
import { ListItem } from "./ListItem";

export const AdminCardapios = () => {
  const [source, setSource] = useState<MenuWithCategories[]>([]);
  const [search, setSearch] = useState("");

  const { store } = useStore();

  useEffect(() => {
    if (store) {
      const src = store.menu.filter((item) =>
        item.name.toUpperCase().includes(search)
      );
      setSource(src);
    }
  }, [search, store, setSource]);

  return (
    <AdminLayout>
      <Card className="p-2 h-full">
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="flex w-full justify-between pt-1 px-2 pb-3">
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
            <CreateModal>Adicionar</CreateModal>
          </div>

          <ListView
            source={source || []}
            render={(item, index) => <ListItem item={item} key={index} />}
          >
            <Columm>Id</Columm>
            <Columm>Nome</Columm>
            <Columm>Categorias</Columm>
            <Columm>Ativo</Columm>
            <Columm>Atualizado em</Columm>
            <Columm>Ações</Columm>
          </ListView>
        </div>
      </Card>
    </AdminLayout>
  );
};
