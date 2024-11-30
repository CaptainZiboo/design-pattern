// commands.ts
import { Task, TaskAction, TaskActions } from "@/types/task";
import { Dispatch } from "react";
import { commands_subject } from "./observer";

export interface Command<T extends TaskAction> {
  action: T;
  undo_action: TaskAction;
  task: Task;
  execute(dispatch: Dispatch<TaskActions>): void;
  undo(dispatch: Dispatch<TaskActions>): void;
}

export class AddTaskCommand implements Command<TaskAction.ADD> {
  action: TaskAction.ADD = TaskAction.ADD;
  undo_action = TaskAction.REMOVE;

  constructor(public task: Task) {}

  execute(dispatch: Dispatch<TaskActions>) {
    dispatch({ type: TaskAction.ADD, payload: this.task });
    commands_subject.next(this);
  }

  undo(dispatch: Dispatch<TaskActions>) {
    dispatch({ type: TaskAction.REMOVE, payload: this.task });
  }
}

export class RemoveTaskCommand implements Command<TaskAction.REMOVE> {
  action: TaskAction.REMOVE = TaskAction.REMOVE;
  undo_action = TaskAction.ADD;

  constructor(public task: Task) {}

  execute(dispatch: Dispatch<TaskActions>) {
    dispatch({ type: TaskAction.REMOVE, payload: this.task });
    commands_subject.next(this);
  }

  undo(dispatch: Dispatch<TaskActions>) {
    dispatch({ type: TaskAction.ADD, payload: this.task });
  }
}

export class ToggleTaskCommand implements Command<TaskAction.TOGGLE> {
  action: TaskAction.TOGGLE = TaskAction.TOGGLE;
  undo_action = TaskAction.TOGGLE;

  constructor(public task: Task) {}

  execute(dispatch: Dispatch<TaskActions>) {
    dispatch({ type: TaskAction.TOGGLE, payload: this.task });
    commands_subject.next(this);
  }

  undo(dispatch: Dispatch<TaskActions>) {
    this.execute(dispatch);
  }
}

export type TaskCommand =
  | AddTaskCommand
  | RemoveTaskCommand
  | ToggleTaskCommand;
