// App.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddTaskCommand, TaskCommand } from "@/lib/command";
import { TaskFactory } from "@/lib/factory";
import { TaskList } from "./list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTasks } from "@/context/tasks";
import { useEffect, useMemo, useState } from "react";
import { commands_subject } from "@/lib/observer";
import { Notifications } from "./notifications";
import { SortByCompletion, SortByTitle, TaskSorter } from "@/lib/strategy";
import { Separator } from "../ui/separator";
import { RiArrowGoBackLine } from "@remixicon/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
});

export const App = () => {
  const { state, dispatch } = useTasks();
  const [sorter, setSorter] = useState<TaskSorter | undefined>();
  const [commands, setCommands] = useState<TaskCommand[]>([]);

  // Keep state always synced with localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);

  // Subscribe to the commands subject & update the commands history
  useEffect(() => {
    const sub = commands_subject.subscribe((command) => {
      setCommands((prev) => [...prev, command]);
    });

    return () => sub.unsubscribe();
  }, [dispatch]);

  // Retrieve undo function from the last command in the history
  const undo: (() => void) | undefined = useMemo(() => {
    if (commands.length === 0) return;
    else
      return () => {
        const command = commands.pop();

        if (command) {
          command.undo(dispatch);
          setCommands([...commands]);
        }
      };
  }, [commands, dispatch]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Update the sorter strategy based on the selected value
  const onSorterChange = (value: string) => {
    switch (value) {
      case "title":
        setSorter(new TaskSorter(new SortByTitle()));
        break;
      case "completion":
        setSorter(new TaskSorter(new SortByCompletion()));
        break;
      default:
        setSorter(undefined);
        break;
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const task = TaskFactory.create(values.title, values.description);
    new AddTaskCommand(task).execute(dispatch);
    form.reset();
  };

  return (
    <>
      <main className="flex flex-col w-screen h-screen p-10 overflow-hidden">
        <h1 className="text-3xl font-bold mb-8">Gestionnaire de tâches</h1>

        <div className="flex gap-6 flex-1 overflow-hidden">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 w-72 p-2"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="titre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Ajouter une tâche</Button>
            </form>
          </Form>

          <Separator orientation="vertical" className="h-full" />

          <div className="flex flex-col flex-1 gap-6 overflow-hidden p-2">
            <div className="flex justify-between">
              <Select onValueChange={onSorterChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier les tâches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ne pas trier</SelectItem>
                  <SelectItem value="title">Ordre alphabétique</SelectItem>
                  <SelectItem value="completion">
                    Statut de complétion
                  </SelectItem>
                </SelectContent>
              </Select>

              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={undo}
                      disabled={!undo}
                    >
                      <RiArrowGoBackLine />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Annuler la dernière action</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <TaskList tasks={state} sorter={sorter} dispatch={dispatch} />
          </div>
        </div>
      </main>

      <Notifications />
    </>
  );
};
