import { ElementType, ReactNode } from "react";
import { HeaderRow } from "../Table/HeaderRow";

interface Props {
  source: any[];
  className?: string;
  as?: ElementType;
  children?: ReactNode;
  render?: (value: any, index: number, array: any[]) => JSX.Element;
}

export const ListView = ({ source, render, className, children }: Props) => {
  function renderItem(value: any, index: number, array: any[]) {
    if (typeof render !== "undefined") return render(value, index, array);

    return <li>{value}</li>;
  }

  return (
    <div className="table relative bg-white w-full h-full overflow-auto">
      <ul className="relative w-full h-full overflow-auto">
        <table className="w-full bg-white">
          <thead>
            <HeaderRow>{children}</HeaderRow>
          </thead>
          <tbody>{source.map(renderItem)}</tbody>
        </table>
      </ul>
    </div>
  );
};
