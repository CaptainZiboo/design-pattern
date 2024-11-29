import { Task } from "./types/task";

interface Strategy {
  execute: (tasks: Task[]) => Task[];
}

export class SortByTitle implements Strategy {
  execute(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }
}

export class SortByCompleted implements Strategy {
  execute(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));
  }
}

export class Sortable {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  sort(tasks: Task[]): Task[] {
    return this.strategy.execute(tasks);
  }
}
