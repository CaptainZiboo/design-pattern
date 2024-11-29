import { TaskAction, TaskState } from "@/types/task";
import { initialState } from "./reducer";
import { createContext } from "react";

interface ContextProps {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}

export const TaskContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});
