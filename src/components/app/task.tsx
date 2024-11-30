// Task.tsx
import { Task } from "@/types/task";
import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { RiCheckLine, RiCloseLine, RiDeleteBinLine } from "@remixicon/react";

interface TaskProps {
  task: Task;
  toggle: MouseEventHandler<HTMLButtonElement>;
  remove: MouseEventHandler<HTMLButtonElement>;
}

export const TaskComponent: React.FC<TaskProps> = ({
  task,
  toggle,
  remove,
}: TaskProps) => {
  return (
    <div className="flex justify-between items-center p-2">
      <div>
        <h3
          className={cn(
            task.completed && "line-through",
            "font-semibold text-lg flex items-center"
          )}
        >
          {task.completed && <RiCheckLine color="green" className="mr-2" />}
          <span>{task.title}</span>
        </h3>
        <p className="text-gray-500 text-sm">{task.description}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={toggle}>
          {task.completed ? <RiCloseLine /> : <RiCheckLine />}
        </Button>

        <Button size="icon" variant="destructive" onClick={remove}>
          <RiDeleteBinLine />
        </Button>
      </div>
    </div>
  );
};
