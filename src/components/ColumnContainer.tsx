import { useSortable } from "@dnd-kit/sortable";
import MinusIcon from "../icons/MinusIcon";
import { Column, Id } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
interface Props {
  column: Column;
  DeleteColumn: (id: Id) => void;
  UpdateColumn: (id: Id, title: string) => void;
}
const ColumnContainer = (props: Props) => {
  const { column, DeleteColumn, UpdateColumn } = props;
  const [editMode, setEditMode] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-col-bg flex h-[500px] max-h-[500px] w-2xs flex-col rounded-md border-rose-500"
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-col-bg flex h-[500px] max-h-[500px] w-2xs flex-col rounded-md"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-main-bg text-md border-col-bg flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 p-3 font-bold"
      >
        <div className="flex gap-2">
          <div className="bg-col-bg flex items-center justify-center rounded-full px-2 py-1 text-sm">
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              value={column.title}
              onChange={(e) => UpdateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditMode(false)}
              className="rounded border bg-black px-2 outline-none focus:border-rose-500"
            />
          )}
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
