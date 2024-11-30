import { useEffect } from "react";
import { Toaster } from "../ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { commands_subject } from "@/lib/observer";
import { TaskAction } from "@/types/task";
import { ToastAction } from "../ui/toast";
import { useTasks } from "@/context/tasks";

export const Notifications = () => {
  const { toast } = useToast();
  const { dispatch } = useTasks();

  useEffect(() => {
    const sub = commands_subject.subscribe((command) => {
      let message;

      switch (command.action) {
        case TaskAction.ADD:
          message = `Tache "${command.task.title}" ajoutée !`;
          break;
        case TaskAction.REMOVE:
          message = `Task "${command.task.title}" supprimée !`;
          break;
        case TaskAction.TOGGLE:
          message = `Task "${command.task.title}" mise à jour !`;
          break;
      }

      toast({
        title: message,
        action: (
          <ToastAction onClick={() => command.undo(dispatch)} altText="Annuler">
            Annuler
          </ToastAction>
        ),
      });
    });

    return () => sub.unsubscribe();
  }, [toast, dispatch]);

  return <Toaster />;
};
