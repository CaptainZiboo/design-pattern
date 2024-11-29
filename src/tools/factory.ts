import { Task } from "@/types/task";

export class TaskFactory {
  static create(title: string, description: string): Task {
    return { id: Date.now(), title, description, completed: false };
  }
}
