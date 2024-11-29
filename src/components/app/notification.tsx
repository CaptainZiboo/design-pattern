// notifications.tsx
import { taskSubject } from "@/tools/observer";
import { useEffect, useState } from "react";

export const Notifications = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const subscription = taskSubject.subscribe((task) => {
      setNotifications((prev) => [...prev, `Task Created: ${task.title}`]);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification: string, i: number) => (
          <li key={i}>{`Task Created: ${notification}`}</li>
        ))}
      </ul>
    </div>
  );
};
