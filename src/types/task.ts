export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export type TaskState = Task[];

export enum TaskAction {
  ADD = "ADD_TASK",
  REMOVE = "REMOVE_TASK",
  TOGGLE = "TOGGLE_TASK",
}

export type TaskActions =
  | { type: TaskAction.ADD; payload: Task }
  | { type: TaskAction.REMOVE; payload: Task }
  | { type: TaskAction.TOGGLE; payload: Task };
