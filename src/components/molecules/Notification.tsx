import { useEffect } from "react";
import { X, XCircle } from "lucide-react";

const DURATION = 5000;

export interface NotificationData {
  id: string;
  title: string;
  message: string;
}

interface NotificationProps extends NotificationData {
  onDismiss: (id: string) => void;
}

export function Notification({
  id,
  title,
  message,
  onDismiss,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), DURATION);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <div
      role="alert"
      className="animate-slide-in-from-right bg-destructive text-destructive-foreground pointer-events-auto flex w-72 gap-3 rounded-lg p-4 shadow-lg"
    >
      <XCircle className="h-5 w-5 shrink-0" />

      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="mt-1 text-sm">{message}</p>
      </div>

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
