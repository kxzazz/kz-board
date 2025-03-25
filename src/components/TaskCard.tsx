import { useState } from "react";
import MinusIcon from "../icons/MinusIcon";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const TaskCard = (props: Props) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode((p) => !p);
    setMouseOver(false);
  };

  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging,
  } = useSortable({
    id: props.task.id,
    data: {
      type: "Task",
      task: props.task,
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
        className="bg-main-bg relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-rose-500 p-2.5 text-left opacity-30"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-main-bg relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl p-2.5 text-left hover:ring-2 hover:ring-rose-500 hover:ring-inset"
      >
        <textarea
          className="h-[90%] w-full resize-none rounded border-none bg-transparent text-white focus:outline-none"
          value={props.task.content}
          autoFocus
          placeholder="Enter task content"
          onBlur={toggleEditMode}
          onKeyDown={(e) => e.key === "Enter" && e.shiftKey && toggleEditMode()}
          onChange={(e) => props.updateTask(props.task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="bg-main-bg task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl p-2.5 text-left hover:ring-2 hover:ring-rose-500 hover:ring-inset"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <p className="m-auto h-[90%] w-full overflow-x-hidden overflow-y-auto whitespace-pre-wrap">
        {props.task.content}
      </p>
      {mouseOver && (
        <button
          onClick={() => props.deleteTask(props.task.id)}
          className="bg-col-bg absolute top-1/2 right-4 -translate-y-1/2 rounded stroke-white p-2 opacity-60 hover:opacity-100"
        >
          <MinusIcon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
