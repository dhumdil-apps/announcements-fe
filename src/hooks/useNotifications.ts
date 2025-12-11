import { useState, useCallback } from "react";
import type {
  NotificationData,
  NotificationType,
} from "@/components/molecules";

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
    show: (message: string, type?: NotificationType) => {
      addNotification({ message, type });
    },
    error: (message: string, details?: unknown) => {
      console.warn({ message, details }); // TODO: send errors to logging service
      addNotification({ message, type: "deleted" });
    },
  };

  return {
    notifications,
    notify,
    dismissNotification,
  };
}
