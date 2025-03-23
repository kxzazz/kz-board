import PlusIcon from "../icons/PlusIcon";

const KanbanBoard = () => {
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <div className="m-auto">
        <button className="bg-main-bg border-color-col-bg flex h-[60px] w-[350px] min-w-[350px] cursor-pointer items-center justify-center gap-6 rounded-lg border-2 p-4 ring-rose-500 hover:ring-2">
          <PlusIcon />
          Add Column
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
