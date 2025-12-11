import { Notification } from "@/components/molecules";
import type { NotificationData } from "@/components/molecules";

interface NotificationContainerProps {
  notifications: NotificationData[];
  onDismiss: (id: string) => void;
}

export function NotificationContainer({
  notifications,
  onDismiss,
}: NotificationContainerProps) {
  if (!notifications.length) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          title={notification.title}
          message={notification.message}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}
