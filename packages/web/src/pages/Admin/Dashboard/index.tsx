import { Chart } from "~/components/Chart";
import { AdminLayout } from "~/components/Layout/Admin";

export const AdminDashboard = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="flex space-x-2 mx-auto">
        <Chart type="line" data={data} />
        <Chart type="line" data={data} />
        <Chart type="line" data={data} />
        <Chart type="line" data={data} />
        <Chart type="line" data={data} />
      </div>
    </AdminLayout>
  );
};
