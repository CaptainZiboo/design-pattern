import { TaskAction, TaskActions, TaskState } from "@/types/task";
import { createContext, Dispatch, useContext } from "react";

const tasks = localStorage.getItem("tasks");

export const initialState: TaskState = tasks ? JSON.parse(tasks) : [];

export const tasksReducer = (
  state: TaskState,
  action: TaskActions
): TaskState => {
  switch (action.type) {
    case TaskAction.ADD:
      return [...state, action.payload];
    case TaskAction.REMOVE:
      return state.filter((task) => task.id !== action.payload.id);
    case TaskAction.TOGGLE:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );
    default:
      return state;
  }
};

interface ContextProps {
  state: TaskState;
  dispatch: Dispatch<TaskActions>;
}

export const TaskContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
};
