import { X, Bell, Plus, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType = "info" | "created" | "updated" | "deleted";

export interface NotificationData {
  id: string;
  message: string;
  type?: NotificationType;
}

interface NotificationProps extends NotificationData {
  onDismiss: (id: string) => void;
}

const icons: Record<NotificationType, typeof Bell> = {
  info: Bell,
  created: Plus,
  updated: Pencil,
  deleted: Trash2,
};

export function Notification({
  id,
  message,
  type = "info",
  onDismiss,
}: NotificationProps) {
  const Icon = icons[type];

  return (
    <div
      role="alert"
      className={cn(
        "animate-slide-in-from-right pointer-events-auto flex w-72 gap-3 rounded-lg p-4 shadow-lg",
        type === "deleted"
          ? "bg-destructive text-destructive-foreground"
          : "bg-primary text-primary-foreground",
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />

      <p className="flex-1 text-sm">{message}</p>

      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 opacity-70 hover:opacity-100"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
