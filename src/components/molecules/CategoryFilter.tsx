import Select from "react-select";
import type { Category } from "@/data/types";

interface CategoryFilterProps {
  categories: Category[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function CategoryFilter({
  categories,
  selected,
  onChange,
  placeholder = "Filter by category...",
}: CategoryFilterProps) {
  return (
    <div className="w-full">
      <Select
        isMulti
        options={categories}
        value={categories.filter((c) => selected.includes(c.value))}
        onChange={(selectedOptions) =>
          onChange(selectedOptions.map((opt) => opt.value))
        }
        placeholder={placeholder}
        classNames={{
          control: () => "!border-input !shadow-sm",
        }}
      />
    </div>
  );
}
