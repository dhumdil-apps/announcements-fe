import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default";
  size?: "default";
}

function Badge({
  children,
  variant = "default",
  size = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center text-xs font-medium transition-colors",
        variant === "default" && "bg-secondary text-secondary-foreground",
        size === "default" && "rounded-full px-2.5 py-0.5",
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge };
