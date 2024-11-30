// TaskList.tsx
import { Task, TaskActions } from "@/types/task";
import { Dispatch, useMemo } from "react";
import { TaskComponent } from "./task";
import { TaskSorter } from "@/lib/strategy";
import { RemoveTaskCommand, ToggleTaskCommand } from "@/lib/command";
import { Separator } from "../ui/separator";

interface TaskListProps {
  tasks: Task[];
  sorter?: TaskSorter;
  dispatch: Dispatch<TaskActions>;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  sorter,
  dispatch,
}) => {
  const sorted = useMemo(
    () => (sorter ? sorter.sort(tasks) : tasks),
    [tasks, sorter]
  );

  const toggle = (task: Task) => {
    return () => new ToggleTaskCommand(task).execute(dispatch);
  };

  const remove = (task: Task) => {
    return () => new RemoveTaskCommand(task).execute(dispatch);
  };

  return (
    <ul className="flex-1 overflow-y-auto task-scrollbar">
      {sorted.map((task, i) => (
        <li key={i}>
          <TaskComponent
            key={task.id}
            task={task}
            remove={remove(task)}
            toggle={toggle(task)}
          />

          {i !== tasks.length - 1 && (
            <Separator className="my-2 w-[99%] mx-auto" />
          )}
        </li>
      ))}
    </ul>
  );
};
