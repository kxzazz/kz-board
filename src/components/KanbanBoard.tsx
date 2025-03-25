import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const colsId = useMemo(() => columns.map((column) => column.id), [columns]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  function createNewColumn(): void {
    setColumns([
      ...columns,
      {
        id: genrandomId(),
        title: `Column ${columns.length + 1}`,
      },
    ]);
  }

  function deleteColumn(id: Id): void {
    setColumns(columns.filter((column) => column.id !== id));
  }
  function updateColumn(id: Id, title: string) {
    const newCols = columns.map((column) => {
      if (column.id === id) {
        return {
          ...column,
          title,
        };
      }
      return column;
    });

    setColumns(newCols);
  }

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: genrandomId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          content,
        };
      }
      return task;
    });

    setTasks(newTasks);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === active.id,
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === over.id,
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="m-auto flex gap-2">
          <div className="flex gap-4">
            <SortableContext items={colsId}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className="bg-main-bg border-color-col-bg flex h-[60px] w-[350px] min-w-[350px] cursor-pointer items-center justify-center gap-6 rounded-lg border-2 p-4 ring-rose-500 hover:ring-2"
            onClick={() => createNewColumn()}
          >
            <PlusIcon />
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id,
                )}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

function genrandomId(): Id {
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
