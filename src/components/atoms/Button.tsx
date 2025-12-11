import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline";
  size?: "default";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variant === "default" &&
            "bg-primary hover:bg-primary-hover font-bold text-black",
          variant === "destructive" &&
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          variant === "outline" &&
            "border-input bg-background hover:bg-secondary hover:text-secondary-foreground border",
          size === "default" && "h-10 px-4 py-2",
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
