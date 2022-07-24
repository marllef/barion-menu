import { Menu } from "@prisma/client";
import { DataItem } from "~/components/Table/DataItem";
import { Row } from "~/components/Table/Row";
import { useAuth } from "~/hooks/useAuth";
import { useStore } from "~/hooks/useStore";
import { CategoryWithFood } from "~/interfaces/api/APICategory";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";

interface ListItemProps {
  item: MenuWithCategories;
}

export const ListItem = ({ item }: ListItemProps) => {
  const { user } = useAuth();
  return (
    <Row>
      <DataItem>{item.id}</DataItem>
      <DataItem>{item.name}</DataItem>
      <DataItem>{item.categories.length}</DataItem>
      <DataItem>
        {item.id === user?.store?.activeMenu ? "Sim" : "Não"}
      </DataItem>
      <DataItem>{new Date(item?.updatedAt).toLocaleString()}</DataItem>
      <DataItem>Editar | Excluir</DataItem>
    </Row>
  );
};
