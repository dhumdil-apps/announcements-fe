import type { Category } from "@/data/types";
import { SearchBox } from "@/components/molecules";

import { CategoryFilter } from "@/components/molecules";

interface AnnouncementsFiltersProps {
  categories: Category[];
  categoryFilter: string[];
  setCategoryFilter: (values: string[]) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function AnnouncementsFilters({
  categories,
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery,
}: AnnouncementsFiltersProps) {
  return (
    <div className="flex flex-col items-end justify-between gap-4 lg:flex-row lg:items-center">
      <SearchBox value={searchQuery} onChange={setSearchQuery} />

      <CategoryFilter
        categories={categories}
        selected={categoryFilter}
        onChange={setCategoryFilter}
      />
    </div>
  );
}
