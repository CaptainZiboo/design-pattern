// App.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTasks } from "@/tools/store/hook";
import { AddTaskCommand } from "@/tools/command";
import { TaskFactory } from "@/tools/factory";
import { Notifications } from "./notification";
import { TaskList } from "./list";
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

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
});

export const App = () => {
  const { state, dispatch } = useTasks();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const task = TaskFactory.create(values.title, values.description);
    new AddTaskCommand(task, dispatch).execute();
    form.reset();
  };

  return (
    <>
      <h1>Tasks</h1>
      <Notifications />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input {...form.register("title")} placeholder="Title" />
        <input {...form.register("description")} placeholder="Description" />
        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={state} dispatch={dispatch} />
    </>
  );
};
