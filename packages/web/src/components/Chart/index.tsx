import { Chart as ChartJS, registerables } from "chart.js";
import { Chart as ChartComponent, ChartProps } from "react-chartjs-2";
import { Card } from "../Card";

ChartJS.register(...registerables);

interface Props extends ChartProps {}

export const Chart = ({ type, data, ...rest }: Props) => {
  return (
    <Card className="w-fit h-fit p-2">
      <ChartComponent type={type} data={data} {...rest} />
    </Card>
  );
};
