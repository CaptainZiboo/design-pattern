export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export type TaskState = Task[];

export type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "REMOVE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number };
