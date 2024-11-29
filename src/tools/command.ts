// commands.ts
import { Task, TaskAction } from "@/types/task";
import { Dispatch } from "react";
import { taskSubject } from "./observer";

export interface Command {
  execute(): void;
}

export class AddTaskCommand implements Command {
  constructor(private task: Task, private dispatch: Dispatch<TaskAction>) {}

  execute() {
    this.dispatch({ type: "ADD_TASK", payload: this.task });
    taskSubject.next(this.task);
  }
}

export class DeleteTaskCommand implements Command {
  constructor(private id: number, private dispatch: Dispatch<TaskAction>) {}

  execute() {
    this.dispatch({ type: "REMOVE_TASK", payload: this.id });
  }
}

export class ToggleTaskCommand implements Command {
  constructor(private id: number, private dispatch: Dispatch<TaskAction>) {}

  execute() {
    this.dispatch({ type: "TOGGLE_TASK", payload: this.id });
  }
}
