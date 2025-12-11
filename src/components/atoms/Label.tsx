import * as React from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: "default";
  size?: "default";
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ variant = "default", size = "default", ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        variant === "default" && "",
        size === "default" && "text-sm",
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { Label };
