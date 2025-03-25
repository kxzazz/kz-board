import { useSortable } from "@dnd-kit/sortable";
import MinusIcon from "../icons/MinusIcon";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";
interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}
const ColumnContainer = (props: Props) => {
  const [editMode, setEditMode] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.column.id,
    data: {
      type: "Column",
      column: props.column,
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
          {!editMode && props.column.title}
          {editMode && (
            <input
              value={props.column.title}
              onChange={(e) =>
                props.updateColumn(props.column.id, e.target.value)
              }
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditMode(false)}
              className="rounded border bg-black px-2 outline-none focus:border-rose-500"
            />
          )}
        </div>
        <button
          onClick={() => props.deleteColumn(props.column.id)}
          className="hover:bg-col-bg rounded-full stroke-gray-500 px-1 py-2 hover:stroke-white"
        >
          <MinusIcon />
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-4 overflow-x-hidden overflow-y-auto p-2">
        {props.tasks.map((task) => (
          <TaskCard key={task.id} task={task} deleteTask={props.deleteTask} />
        ))}
      </div>
      <button
        className="border-col-bg border-x-col-bg hover:bg-main-bg flex items-center gap-2 rounded-md border-2 p-4 hover:text-rose-500 active:bg-black"
        onClick={() => props.createTask(props.column.id)}
      >
        <PlusIcon /> Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
