import { PropsWithChildren, useReducer } from "react";
import { initialState, TaskContext, tasksReducer } from ".";

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
