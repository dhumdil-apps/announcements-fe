import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { isUsingMockData, subscribe } from "@/api/mockDataState";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
  variant: "mobile" | "desktop";
  label?: string;
}

export function AlertBanner({ variant, label = "Offline" }: AlertBannerProps) {
  const [usingMock, setUsingMock] = useState(isUsingMockData);

  useEffect(() => {
    return subscribe(setUsingMock);
  }, []);

  if (!usingMock) {
    return null;
  }

  return (
    <button
      type="button"
      className={cn(
        "bg-destructive text-destructive-foreground group flex items-center overflow-hidden rounded px-3 py-2 text-sm font-medium transition-all duration-300",
        variant === "desktop" && "mt-auto gap-2",
      )}
      title={label}
    >
      <AlertTriangle className="h-5 w-5" />
      <span
        className={cn(
          variant === "mobile" &&
            "max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-48 group-hover:opacity-100 group-focus:max-w-48 group-focus:pl-2 group-focus:opacity-100",
        )}
      >
        {label}
      </span>
    </button>
  );
}
