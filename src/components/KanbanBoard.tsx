import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  function createNewColumn(): void {
    const columnToAdd: Column = {
      id: genrandomId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function DeleteColumn(id: Id): void {
    setColumns(columns.filter((column) => column.id !== id));
  }
  console.log(columns);
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <div className="m-auto flex gap-2">
        <div className="flex gap-4">
          {columns.map((column) => (
            <ColumnContainer
              key={column.id}
              column={column}
              DeleteColumn={DeleteColumn}
            />
          ))}
        </div>
        <button
          className="bg-main-bg border-color-col-bg flex h-[60px] w-[350px] min-w-[350px] cursor-pointer items-center justify-center gap-6 rounded-lg border-2 p-4 ring-rose-500 hover:ring-2"
          onClick={() => createNewColumn()}
        >
          <PlusIcon />
          Add Column
        </button>
      </div>
    </div>
  );
};

function genrandomId(): Id {
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
