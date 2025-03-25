import { useState } from "react";
import MinusIcon from "../icons/MinusIcon";
import { Id, Task } from "../types";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
}

const TaskCard = (props: Props) => {
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <div
      className="bg-main-bg relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl p-2.5 text-left hover:ring-2 hover:ring-rose-500 hover:ring-inset"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {props.task.content}
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
