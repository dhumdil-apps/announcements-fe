import type { Announcement, Category } from "@/data/types";
import { Plus } from "lucide-react";
import { AnnouncementsTable } from "@/components/organisms";
import { Link } from "@/components/atoms";

export function AnnouncementsList({
  announcements,
  categories,
  selectedCategories,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: {
  announcements: Announcement[];
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (values: string[]) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div>
      <h1 className="py-6 text-2xl font-bold">Announcements</h1>

      <div className="pb-12">
        <AnnouncementsTable
          data={announcements}
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
      </div>

      <div className="fixed right-4 bottom-4 text-black lg:right-13">
        <Link
          to="/announcements/new"
          variant="primary"
          aria-label="New Announcement"
        >
          <Plus className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
