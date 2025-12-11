import type { ReactNode } from "react";
import { Label } from "@/components/atoms";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  description,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
      {children}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
