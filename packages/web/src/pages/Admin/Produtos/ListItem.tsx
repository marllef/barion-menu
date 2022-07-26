import { Product } from "@prisma/client";
import { ActionButton } from "~/components/Buttons/Action";
import { DataItem } from "~/components/Table/DataItem";
import { Row } from "~/components/Table/Row";
import { ProductServices } from "~/services/ProductServices";
import { BRL } from "~/utils/currency";
import { showError, showSuccess } from "~/utils/toastfy/toasts";
import { DeleteProductModal as Delete } from "./Actions/Delete";
import { EditModal as Edit } from "./Actions/Edit";

interface ListItemProps {
  item: Product;
}

export const ListItem = ({ item }: ListItemProps) => {
  function getStatus(value: number) {
    if (value >= 5) {
      return "Disponível";
    }

    if (value < 5) {
      return "Estoque Crítico";
    }

    return "Indisponível";
  }

  async function handleDelete() {
    try {
      await ProductServices.delete(item.id);
      showSuccess("Produto deletado com sucesso!");
    } catch (err: any) {
      showError(err.message);
    }
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
      <DataItem>
        <div className="space-x-4">
          <Edit item={item}>Editar</Edit>
          <Delete name={item.name} onConfirm={handleDelete}>
            Excluir
          </Delete>
        </div>
      </DataItem>
    </Row>
  );
};
