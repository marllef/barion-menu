interface Props {
  source?: any[];
  renderItem?: { (item: any, index: number): JSX.Element };
}

export const ScrollList = ({ source, renderItem }: Props) => {
  const render = (item: any, index: number) => {
    if (typeof renderItem !== "undefined") return renderItem(item, index);

    return <li key={index}>{item}</li>;
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <ul className="flex flex-col w-full h-full p-2 overflow-y-auto">
        {source?.map(render)}
      </ul>
    </div>
  );
};
