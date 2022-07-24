import { DataItem } from "~/components/Table/DataItem";
import { Row } from "~/components/Table/Row";
import { CategoryWithFood } from "~/interfaces/api/APICategory";
import { CategoryServices } from "~/services/CategoryServices";
import { showError, showSuccess } from "~/utils/toastfy/toasts";
import { DeleteModal } from "./Actions/Delete";

interface ListItemProps {
  item: CategoryWithFood;
}

export const ListItem = ({ item }: ListItemProps) => {
  async function handleDelete() {
    try {
      await CategoryServices.delete(item.id);
      showSuccess("Produto deletado com sucesso!");
    } catch (err: any) {
      showError(err.message);
    }
  }
  return (
    <Row>
      <DataItem>{item.id}</DataItem>
      <DataItem>{item.name}</DataItem>
      <DataItem>{item.foods.length}</DataItem>
      <DataItem>{new Date(item?.createdAt).toLocaleString()}</DataItem>
      <DataItem>{new Date(item?.updatedAt).toLocaleString()}</DataItem>
      <DataItem>
        <DeleteModal name={item.name} onConfirm={handleDelete}>
          Excluir
        </DeleteModal>
      </DataItem>
    </Row>
  );
};
