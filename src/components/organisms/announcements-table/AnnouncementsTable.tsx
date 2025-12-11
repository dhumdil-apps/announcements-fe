import type { Announcement, Category } from "@/data/types";
import { AnnouncementsFilters } from "./AnnouncementsFilters";
import { useAnnouncementsTable } from "./useAnnouncementsTable";
import { MobileAnnouncementsList } from "./MobileAnnouncementsList";
import { DesktopAnnouncementsTable } from "./DesktopAnnouncementsTable";

interface AnnouncementsTableProps {
  data: Announcement[];
  categories: Category[];
}

export function AnnouncementsTable({
  data,
  categories,
}: AnnouncementsTableProps) {
  const {
    table,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
  } = useAnnouncementsTable({
    data,
    categories,
  });

  const hasFilters = searchQuery.length > 0 || categoryFilter.length > 0;
  const isEmpty = data.length === 0;
  const isFilteredEmpty =
    !isEmpty && table.getRowModel().rows.length === 0 && hasFilters;

  return (
    <div className="space-y-4">
      <AnnouncementsFilters
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
