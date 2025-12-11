import { Search } from "lucide-react";
import { Input } from "@/components/atoms";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function SearchBox({
  value,
  onChange,
  className,
  placeholder = "Search...",
}: SearchBoxProps) {
  return (
    <div className={className ?? "relative w-full"}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        iconLeft={
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        }
      />
    </div>
  );
}
