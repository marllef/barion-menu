import { Menu } from "@prisma/client";
import { DataItem } from "~/components/Table/DataItem";
import { Row } from "~/components/Table/Row";
import { CategoryWithFood } from "~/interfaces/api/APICategory";

interface ListItemProps {
  item: Menu;
}

export const ListItem = ({ item }: ListItemProps) => {
  return (
    <Row>
      <DataItem>{item.id}</DataItem>
      <DataItem>{item.name}</DataItem>
      <DataItem>{item.slug}</DataItem>
      <DataItem>{new Date(item?.createdAt).toLocaleString()}</DataItem>
      <DataItem>{new Date(item?.updatedAt).toLocaleString()}</DataItem>
      <DataItem>Editar | Excluir</DataItem>
    </Row>
  );
};
