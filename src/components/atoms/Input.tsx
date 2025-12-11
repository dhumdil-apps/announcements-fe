import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  iconLeft?: React.ReactElement;
  variant?: "default" | "error";
  size?: "default";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { type, iconLeft, variant = "default", size = "default", ...props },
    ref,
  ) => {
    return (
      <>
        {iconLeft}
        <input
          type={type}
          className={cn(
            "flex w-full rounded-md border text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            variant === "default" &&
              "border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring file:border-0 file:bg-transparent file:text-sm file:font-medium",
            variant === "error" &&
              "border-destructive bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-destructive file:border-0 file:bg-transparent file:text-sm file:font-medium",
            size === "default" && "h-10 px-3 py-2",
            !!iconLeft && "pl-10",
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };
