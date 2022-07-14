import { Food } from "@prisma/client";
import { Button } from "~/components/Buttons/Button";
import { Card } from "~/components/Card";
import { AdminLayout } from "~/components/Layout/Admin";
import { ListView } from "~/components/ListView";

interface ListItemProps {
  item: Food;
}

const ListItem = () => {
  return (
    <tr className="w-full">
      <td>
        <span className="">Nome 1</span>
      </td>
      <td>
        <span className=" w-20">Dado 2</span>
      </td>
      <td>
        <span className=" w-20">Dado 3</span>
      </td>
      <td>
        <span className=" w-20">Dado 4</span>
      </td>
    </tr>
  );
};

export const AdminMenu = () => {
  return (
    <AdminLayout>
      <Card className="p-2 h-full">
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="flex w-full justify-end border-b py-1 pb-3 mb-2">
            <Button className="uppercase">Nova Categoria</Button>
          </div>

          <ListView
            source={Array.from(Array(101).keys())}
            render={(item, index) => <ListItem />}
          >
            <tr className="w-full">
              <th>
                <span className="w-[50%]">Nome</span>
              </th>
              <th>Idade</th>
              <th>Status</th>
              <th>Criado em</th>
            </tr>
          </ListView>
        </div>
      </Card>
    </AdminLayout>
  );
};
