import * as React from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface LinkProps extends RouterLinkProps {
  children: React.ReactNode;
  title?: string;
  variant?: "default" | "primary" | "circle";
  size?: "default";
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { children, title, variant = "default", size = "default", ...props },
    ref,
  ) => {
    return (
      <RouterLink
        ref={ref}
        title={title}
        className={cn(
          "flex items-center gap-2 rounded transition-colors",
          size === "default" && "px-4 py-2",
          variant === "default" && "hover:bg-accent [&.active]:bg-accent",
          variant === "circle" && "text-black hover:text-blue-500",
          variant === "primary" &&
            "bg-primary hover:bg-primary-hover h-12 w-12 justify-center rounded-full px-0 shadow-lg shadow-black/50",
        )}
        {...props}
      >
        {children}
      </RouterLink>
    );
  },
);
Link.displayName = "Link";

export { Link };
