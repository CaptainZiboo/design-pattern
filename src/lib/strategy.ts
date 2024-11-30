// strategy.ts
import { Task } from "@/types/task";

interface SortStrategy {
  sort(tasks: Task[]): Task[];
}

export class SortByTitle implements SortStrategy {
  sort(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }
}

export class SortByCompletion implements SortStrategy {
  sort(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));
  }
}

export class TaskSorter {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  sort(tasks: Task[]): Task[] {
    return this.strategy.sort(tasks);
  }
}
