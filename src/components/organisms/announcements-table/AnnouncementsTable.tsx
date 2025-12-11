import type { Announcement, Category } from "@/data/types";
import { AnnouncementsFilters } from "./AnnouncementsFilters";
import { useAnnouncementsTable } from "./useAnnouncementsTable";
import { MobileAnnouncementsList } from "./MobileAnnouncementsList";
import { DesktopAnnouncementsTable } from "./DesktopAnnouncementsTable";

interface AnnouncementsTableProps {
  data: Announcement[];
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (values: string[]) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function AnnouncementsTable({
  data,
  categories,
  selectedCategories,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: AnnouncementsTableProps) {
  const { table } = useAnnouncementsTable({
    data,
    categories,
  });

  const hasFilters = searchQuery.length > 0 || selectedCategories.length > 0;
  const isEmpty = data.length === 0 && !hasFilters;
  const isFilteredEmpty = data.length === 0 && hasFilters;

  return (
    <div className="space-y-4">
      <AnnouncementsFilters
        categories={categories}
        categoryFilter={selectedCategories}
        setCategoryFilter={onCategoryChange}
        searchQuery={searchQuery}
        setSearchQuery={onSearchChange}
      />

      <MobileAnnouncementsList
        table={table}
        isEmpty={isEmpty}
        isFilteredEmpty={isFilteredEmpty}
      />

      <DesktopAnnouncementsTable
        table={table}
        isEmpty={isEmpty}
        isFilteredEmpty={isFilteredEmpty}
      />
    </div>
  );
}
