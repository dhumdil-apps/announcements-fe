import { ArrowDown, ArrowUp, Search } from "lucide-react";
import type { Category } from "../data/types";
import type { SortOrder } from "../hooks/useAnnouncementsTable";

interface AnnouncementsFiltersProps {
  categories: Category[];
  categoryFilter: string[];
  setCategoryFilter: (values: string[]) => void;
  sortOrder: SortOrder;
  toggleSortOrder: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function AnnouncementsFilters({
  categories,
  categoryFilter,
  setCategoryFilter,
  sortOrder,
  toggleSortOrder,
  searchQuery,
  setSearchQuery,
}: AnnouncementsFiltersProps) {
  const handleCategoryToggle = (value: string) => {
    if (categoryFilter.includes(value)) {
      setCategoryFilter(categoryFilter.filter((v) => v !== value));
    } else {
      setCategoryFilter([...categoryFilter, value]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Search */}
      <div className="flex justify-center">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-blue-300 bg-white py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-8">
        {/* Sort */}
        <button
          onClick={toggleSortOrder}
          className="flex cursor-pointer items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
        >
          {sortOrder === "desc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
          Publication date
        </button>
        <div className="flex flex-wrap gap-2">
          {/* Category filter */}
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryToggle(category.value)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                categoryFilter.includes(category.value)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>{" "}
      </div>
    </div>
  );
}
