import { useState, useCallback } from "react";
import type { NotificationData } from "@/components/molecules";

type NotificationOptions = Omit<NotificationData, "id">;

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const addNotification = useCallback((options: NotificationOptions) => {
    const id = crypto.randomUUID();
    setNotifications((prev) => [...prev, { ...options, id }]);
    return id;
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = {
    error: (message: string, title: string, details: unknown) => {
      console.warn({
        title,
        message,
        details,
      }); // TODO: send errors to logging service
      addNotification({ message, title });
    },
  };

  return {
    notifications,
    notify,
    dismissNotification,
  };
}
