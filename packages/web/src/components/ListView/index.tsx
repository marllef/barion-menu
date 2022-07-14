import { ElementType, ReactNode } from "react";

interface Props {
  source: any[];
  as?: ElementType;
  children?: ReactNode;
  render?: (value: any, index: number, array: any[]) => JSX.Element;
}

export const ListView = ({
  source,
  render,
  as: Element = "table",
  children,
}: Props) => {
  function renderItem(value: any, index: number, array: any[]) {
    if (typeof render !== "undefined") return render(value, index, array);

    return <li>{value}</li>;
  }

  return (
    <Element className="w-full h-full overflow-auto">
      <div className="w-full h-full p-1 overflow-auto">
        {children}

        {source.map(renderItem)}
      </div>
    </Element>
  );
};
