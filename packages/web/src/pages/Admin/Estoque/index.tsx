import { Product } from "@prisma/client";
import { Button } from "~/components/Buttons/Button";
import { Card } from "~/components/Card";
import { AdminLayout } from "~/components/Layout/Admin";
import { ListView } from "~/components/ListView";
import { Columm } from "~/components/Table/Column";
import { DataItem } from "~/components/Table/DataItem";
import { Row } from "~/components/Table/Row";
import { BRL } from "~/utils/currency";

interface ListItemProps {
  item: Product;
}

const ListItem = ({ item }: ListItemProps) => {
  function getStatus(value: number) {
    if (value > 5) {
      return "Disponível";
    }
    if (value < 5) {
      return "Estoque Crítico";
    }

    return "Indisponível";
  }
  return (
    <Row>
      <DataItem>{item.name}</DataItem>
      <DataItem>{item.desc}</DataItem>
      <DataItem>{BRL(item.price || 0)}</DataItem>
      <DataItem>{getStatus(item.quantity)}</DataItem>
      <DataItem>
        {new Date(item?.createdAt || new Date()).toLocaleDateString()}
      </DataItem>
      <DataItem>{}</DataItem>
    </Row>
  );
};

export const Estoque = () => {
  
  return (
    <AdminLayout>
      <Card className="p-2 h-full">
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="flex w-full justify-end pt-1 px-2 pb-3">
            <Button className="uppercase">Novo Produto</Button>
          </div>

          <ListView
            source={Array.from(Array(50).keys())}
            render={(item, index) => <ListItem item={item} />}
          >
            <Columm>Produto</Columm>
            <Columm>Desc</Columm>
            <Columm>Preço</Columm>
            <Columm>Status</Columm>
            <Columm>Criado em</Columm>
            <Columm>Ações</Columm>
          </ListView>
        </div>
      </Card>
    </AdminLayout>
  );
};
