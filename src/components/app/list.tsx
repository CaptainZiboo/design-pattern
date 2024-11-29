// TaskList.tsx
import { Task, TaskAction } from "@/types/task";
import { Dispatch, useMemo, useState } from "react";
import { TaskComponent } from "./task";
import { SortByCompletion, SortByTitle, TaskSorter } from "@/tools/strategy";

interface TaskListProps {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, dispatch }) => {
  const [sorter, setSorter] = useState(new TaskSorter(new SortByTitle()));

  const sortedTasks = useMemo(() => sorter.sort(tasks), [tasks, sorter]);

  return (
    <div>
      <button onClick={() => setSorter(new TaskSorter(new SortByTitle()))}>
        Sort by Title
      </button>
      <button onClick={() => setSorter(new TaskSorter(new SortByCompletion()))}>
        Sort by Completion
      </button>
      <ul>
        {sortedTasks.map((task) => (
          <TaskComponent key={task.id} task={task} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
};
