import { DataItem } from "~/components/Table/DataItem";
import { Row } from "~/components/Table/Row";
import { CategoryWithFood } from "~/interfaces/api/APICategory";

interface ListItemProps {
  item: CategoryWithFood;
}

export const ListItem = ({ item }: ListItemProps) => {
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
