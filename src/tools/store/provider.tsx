import { PropsWithChildren, useReducer } from "react";
import { TaskContext } from "./context";
import { initialState, tasksReducer } from "./reducer";

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
