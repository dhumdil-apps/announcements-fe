import { XCircle } from "lucide-react";

interface AlertBoxProps {
  title: string;
  children: React.ReactNode;
}

export function AlertBox({ title, children }: AlertBoxProps) {
  return (
    <div
      role="alert"
      className="bg-destructive/10 border-destructive/50 text-destructive flex gap-3 rounded-lg border p-4"
    >
      <XCircle className="h-5 w-5 shrink-0" />
      <div className="flex-1">
        {title && <h4 className="font-medium">{title}</h4>}
        <div className="mt-1 text-sm">{children}</div>
      </div>
    </div>
  );
}
