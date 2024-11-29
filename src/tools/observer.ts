import { Task } from "@/types/task";
import { Subject } from "rxjs";

export const taskSubject = new Subject<Task>();
