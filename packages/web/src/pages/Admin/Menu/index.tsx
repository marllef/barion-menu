import { Category, Prisma } from "@prisma/client";
import { Button } from "~/components/Buttons/Button";
import { Card } from "~/components/Card";
import { AdminLayout } from "~/components/Layout/Admin";
import { ListView } from "~/components/ListView";

interface ListItemProps {
  item?: Category;
}

const ListItem = ({ item }: ListItemProps) => {
  return (
    <tr className="w-full even:bg-slate-50">
      <td className="p-1">'a'</td>
      <td>Dado 2</td>
      <td>Dado 3</td>
    </tr>
  );
};

export const AdminMenu = () => {
  return (
    <AdminLayout>
      <Card className="p-2 h-full">
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="flex w-full justify-end  py-1 pb-3">
            <Button className="uppercase">Nova Categoria</Button>
          </div>

          <ListView
            source={Array.from(Array(30).keys())}
            render={(item, index) => <ListItem />}
          >
            <tr className="w-full sticky bg-white top-0 left-0 shadow">
              <th className="p-1">Idade</th>
              <th>Status</th>
              <th>Criado em</th>
            </tr>
          </ListView>
        </div>
      </Card>
    </AdminLayout>
  );
};
