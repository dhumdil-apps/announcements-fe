import * as React from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "error";
  size?: "default";
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ variant = "default", size = "default", ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-md border text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          variant === "default" &&
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring",
          variant === "error" &&
            "border-destructive bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-destructive",
          size === "default" && "min-h-20 px-3 py-2",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
TextArea.displayName = "TextArea";

export { TextArea };
