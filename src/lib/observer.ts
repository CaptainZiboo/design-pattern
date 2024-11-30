import { Subject } from "rxjs";
import { TaskCommand } from "./command";

export const commands_subject = new Subject<TaskCommand>();
