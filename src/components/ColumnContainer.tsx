import MinusIcon from "../icons/MinusIcon";
import { Column, Id } from "../types";

interface Props {
  column: Column;
  DeleteColumn: (id: Id) => void;
}
const ColumnContainer = (props: Props) => {
  const { column, DeleteColumn } = props;

  return (
    <div className="bg-col-bg flex h-[500px] max-h-[500px] w-2xs flex-col rounded-md">
      <div className="bg-main-bg text-md border-col-bg flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 p-3 font-bold">
        <div className="flex gap-2">
          <div className="bg-col-bg flex items-center justify-center rounded-full px-2 py-1 text-sm">
            0
          </div>
          {column.title}
        </div>
        <button
          onClick={() => DeleteColumn(column.id)}
          className="hover:bg-col-bg rounded-full stroke-gray-500 px-1 py-2 hover:stroke-white"
        >
          <MinusIcon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
    </div>
  );
};

export default ColumnContainer;
