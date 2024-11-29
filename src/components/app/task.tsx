// Task.tsx
import { Task, TaskAction } from "@/types/task";
import { DeleteTaskCommand, ToggleTaskCommand } from "@/tools/command";
import { Dispatch } from "react";
import { cn } from "@/lib/utils";

interface TaskProps {
  task: Task;
  dispatch: Dispatch<TaskAction>;
}

export const TaskComponent: React.FC<TaskProps> = ({ task, dispatch }) => {
  return (
    <li className={cn(task.completed && "line-through")}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <button
        onClick={() => new ToggleTaskCommand(task.id, dispatch).execute()}
      >
        Toggle
      </button>
      <button
        onClick={() => new DeleteTaskCommand(task.id, dispatch).execute()}
      >
        Delete
      </button>
    </li>
  );
};
